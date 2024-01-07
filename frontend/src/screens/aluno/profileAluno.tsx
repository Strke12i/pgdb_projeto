import { View, Text, Image, Pressable } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {EditButton} from "../../components/EditButton";
import { NavBar } from "../../components/NavBar";
import { useState, useEffect } from "react";
import TextInputComponent from "../../components/TextInputComponent";
import axios from "axios";
import ButtonConfirmComponent from "../../components/ButtonConfirmComponent";
import * as ImagePicker from 'expo-image-picker';
import {showMessage} from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import { getIdentifier } from "../../utils/getInformationsToken";
import { DangerMessage, SuccessMessage } from "../../utils/Messages";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { baseUrl } from "../../utils/consts";
import { Picker } from "@react-native-picker/picker";


const ProfileAluno = () => {
    const {identifier, role} = getIdentifier();

    const [edit, setEdit] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState(new Date());
    const [genero, setGenero] = useState("");
    const [userImage, setUserImage] = useState(false);
    const [userExists, setUserExists] = useState(true);
    const [editImage, setEditImage] = useState(false);

    const matricula = identifier;

    const addImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!permissionResult.granted){
            showMessage({
                message:"É necessário permissão para acessar a galeria!",
                type:"danger",
                floating: true,
            });
            return;
        }

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        })

        if(!image.canceled){
            try{                
                const formData = new FormData();
                formData.append("image", {
                    uri: image.assets[0].uri,
                    name: image.assets[0].uri,
                    type: "image/jpg"
                } as any);
                formData.append("matricula", matricula.toString());

                if(userImage){
                    await fetch("http://10.0.2.2:3000/alunosImagem/", {
                    method: "PUT",
                    headers:{
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json"
                    },
                    body: formData
                });
                }else{
                    await fetch("http://10.0.2.2:3000/alunosImagem/", {
                    method: "POST",
                    headers:{
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json"
                    },
                    body: formData
                });
                }
                
            SuccessMessage("Imagem alterada com sucesso!");
            setEditImage(true);

            }catch(error){
                DangerMessage("Erro ao alterar imagem!");
            }
        }   
    }

    useEffect(() => {
        const fetchAluno = async () => {
            try{
                const response = await axios.get(baseUrl + "/pessoaAluno/"+matricula.toString(), );

                setNome(response.data.nomeAluno);
                setEmail(response.data.email);
                setDataNascimento(response.data.dataNascimento);
                setGenero(response.data.genero);

            } catch (error) {
                const response = await axios.get(baseUrl + "/alunos/"+matricula.toString());
                setNome(response.data.aluno.nomeAluno);
                DangerMessage("Informações não atualizadas!");
            }
        }

        const getImage = async () => {
            try{
                const response = await axios.get( baseUrl + "/alunosImagem/"+matricula.toString(), {
                    headers:{
                        "Content-Type": "application/json",
                    },
                });

                if(response.status != 200){
                    throw new Error("Erro ao buscar imagem");
                }
                setUserImage(true);
            }
            catch(error){
                setUserExists(false);
            }
        }

        getImage();
        fetchAluno();
        setEditImage(false);
                

        }, [editImage]);
    
    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleSubmit = async () => {   
        if(nome === "" || email === "" ){
            DangerMessage("Preencha todos os campos!");
            return;
        }
        if (Date.parse(dataNascimento.toString()) > Date.now()){
            DangerMessage("Data de nascimento inválida!");
            return;
        }

        try{
            if(userExists){
                await axios.put("http://10.0.2.2:3000/pessoaAluno", 
                {
                    matricula: matricula,
                    nomeAluno: nome,
                    email: email,
                    dataNascimento: dataNascimento,
                    genero: genero
                },
                {
                    headers:{
                        "Content-Type": "application/json",
                    },
                }
            );

            SuccessMessage("Perfil atualizado com sucesso!");
            }else{
                await axios.post("http://10.0.2.2:3000/pessoaAluno", 
                {
                    matricula: matricula,
                    nomeAluno: nome,
                    email: email,
                    dataNascimento: dataNascimento,
                    genero: genero
                },
                {
                    headers:{
                        "Content-Type": "application/json",
                    },
                }
            );
            SuccessMessage("Perfil criado com sucesso!");
            setUserExists(true);  
            }
           
        }catch(error){
            DangerMessage("Erro ao atualizar perfil!");
        }
        handleEdit();
        
    }

    const UserImage = userImage ? {
        uri : baseUrl+"/alunosImagem/"+matricula.toString(),
        method: "GET",
    } : require("../../assets/imgs/default.png");


    const showDatePicker = () => {
        DateTimePickerAndroid.open({
            value: dataNascimento,
            mode: "date",
            onChange: (event, selectedDate) => {
                if(selectedDate){
                    setDataNascimento(selectedDate);
                }
            },
            is24Hour: false,
        });
    }

    return (
        <View style={styles.container}>
            {
                role === "aluno" ? (
                    <>
                        <View style={styles.logo}>
                            <Text style={styles.logo_title}>EvalMoji</Text>
                            <Text style={styles.logo_subtitle}>Your evaluation matters</Text>
                        </View>

                        <View>
                            <Image source={UserImage} style={styles.user_img} />
                            <View style={styles.user_edit_button}>
                                <EditButton onPress={addImage}/>
                            </View>
                        </View>

                        <View style={styles.form_container}>

                            <View style={styles.form_edit_button}>
                                <EditButton onPress={handleEdit}/>
                            </View>
                        
                            <Text style={styles.form_description}>Informações do Aluno</Text>

                            <View>
                                <View style={{flexDirection:"row"}}>
                                    <MaterialCommunityIcons name="heart" size={12} color={"#5E4E90"} style={styles.form_icon}/>
                                    <Text style={styles.form_label}>Nome:</Text>
                                </View>

                                <View>
                                    {
                                    edit ? 
                                        <View style={{marginLeft:16}}>
                                            <TextInputComponent placeholder="Nome" maxLength={80} value={nome} onChangeText={setNome}></TextInputComponent>
                                        </View> 
                                        :
                                        <Text style={styles.form_text}>{nome}</Text> 
                                    }
                                </View>


                                <View style={{flexDirection:"row"}}>
                                    <MaterialCommunityIcons name="email" size={12} color={"#5E4E90"} style={styles.form_icon}/>
                                    <Text style={styles.form_label}>Email:</Text>
                                </View>

                                <View>
                                    {
                                    edit ? 
                                        <View style={{marginLeft:16}}>
                                            <TextInputComponent placeholder="Email" maxLength={80} value={email} onChangeText={setEmail}></TextInputComponent>
                                        </View> 
                                        :
                                        <Text style={styles.form_text}>{email}</Text>    
                                    }
                                </View>      
                            
                                <View style={{flexDirection:"row"}}>
                                    <MaterialCommunityIcons name="map" size={12} color={"#5E4E90"} style={styles.form_icon}/>
                                    <Text style={styles.form_label}>Data Nascimento:</Text>
                                </View>

                                <View>
                                    {
                                    edit ? 
                                        <View style={{marginLeft:16}}>
                                            <Pressable onPress={showDatePicker}>
                                                <Text style={styles.text_date}>{dataNascimento.toISOString().split("T")[0]}</Text>
                                            </Pressable>
                                        </View> 
                                        :
                                        <Text style={styles.form_text}>{dataNascimento.toISOString().split("T")[0]}</Text> 
                                    }
                                </View>
                                

                                <View style={{flexDirection:"row"}}>
                                    <MaterialCommunityIcons name="gender-male-female" size={12} color={"#5E4E90"} style={styles.form_icon}/>
                                    <Text style={styles.form_label}>Gênero:</Text>
                                </View>
                            
                                <View>
                                    {
                                    edit ? 
                                        <View>
                                        <Picker
                                            selectedValue={genero}
                                            style={styles.picker}
                                            mode="dropdown"
                                            dropdownIconColor={"#5E4E90"}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setGenero(itemValue)
                                            }
                                            >
                                            <Picker.Item label="Masculino" value="Masculino" style={styles.form_text}/>
                                            <Picker.Item label="Feminino" value="Feminino" style={styles.form_text}/>
                                            <Picker.Item label="Outro" value="Outro" style={styles.form_text} />
                                        </Picker>
                                        
                                                 </View> 
                                        :
                                        <Text style={styles.form_text}>{genero}</Text> 
                                    }
                                </View>

                                {
                                    edit ?
                                    <View style={styles.button_confirm}>
                                        <ButtonConfirmComponent title="Salvar" onClick={() => {
                                            handleSubmit();
                                            
                                        }}/>
                                    </View>
                                    : ""
                                }

                            </View>
                        </View>
                    </>
                ) : 
                (
                    <Text style={styles.logo_title}>Página Indisponível no momento</Text>
                )
            }
            <NavBar/>
            <FlashMessage position="top" />
        </View>
    );
};



export default ProfileAluno;