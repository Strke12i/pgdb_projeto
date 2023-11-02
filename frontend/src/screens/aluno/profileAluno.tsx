import { View, Text, Image } from "react-native";
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
import { useAuth } from "../../context/AuthContext";
import jwt_decode from "jwt-decode";
import { getIdentifier } from "../../utils/getInformationsToken";

type DecodedJwt = {
    matricula: number;
    exp: number;
    iat: number;
    role: string;
}

const ProfileAluno = () => {
    const {identifier, role} = getIdentifier();

    const [edit, setEdit] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState(Date);
    const [genero, setGenero] = useState("");
    const [userImage, setUserImage] = useState(false);

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
                
                
                
            showMessage({
                message:"Imagem alterada com sucesso!",
                type:"success",
                floating: true,
            });

            

            }catch(error){
                showMessage({
                    message:"Erro ao alterar imagem!",
                    type:"danger",
                    floating: true,
                });
            }
        }   
    }

    useEffect(() => {
        const fetchAluno = async () => {
            try{
                const response = await axios.get("http://10.0.2.2:3000/pessoaAluno", {
                    headers:{
                        "Content-Type": "application/json",
                    },
                    data:{
                        matricula: matricula
                    }
                });

                setNome(response.data.nomeAluno);
                setEmail(response.data.email);
                setDataNascimento(response.data.dataNascimento);
                setGenero(response.data.genero);

            } catch (error) {
                console.log(JSON.stringify(error));
            }
        }

        const getImage = async () => {
            try{
                const response = await axios.get("http://10.0.2.2:3000/alunosImagem/"+matricula.toString(), {
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
                console.log(error);
            }
        }

        getImage();
        fetchAluno();

        }, []);
    
    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleSubmit = async () => {
        if(nome === "" || email === "" ){
            showMessage({
                message:"Campos não podem ser vazios!",
                type:"danger",
                floating: true,
            });
            return;
        }
        if (Date.parse(dataNascimento.toString()) > Date.now()){
            showMessage({
                message:"Data de nascimento inválida!",
                type:"danger",
                floating: true,
            });
            return;
        }

        try{
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

            showMessage({
                message:"Perfil atualizado com sucesso!",
                type:"success",
                floating: true,

            });
        }catch(error){
            showMessage({
                message:"Erro ao atualizar perfil!",
                type:"danger",
                floating: true,
            });
        }
        handleEdit();
        
    }

    const UserImage = userImage ? {
        uri : "http://10.0.2.2:3000/alunosImagem/"+matricula.toString(),
        method: "GET",
    } : require("../../assets/imgs/default.png");

    return (
        <View style={styles.container}>
            {
                role === "aluno" ? (
                    <>
                        <View style={styles.logo}>
                            <Text style={styles.logo_title}>App Educação</Text>
                            <Text style={styles.logo_subtitle}>Aqui a gente educa</Text>
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
                                            <TextInputComponent placeholder="Data" maxLength={12} value={dataNascimento} onChangeText={setDataNascimento} keyboardType="number-pad"></TextInputComponent>
                                        </View> 
                                        :
                                        <Text style={styles.form_text}>{dataNascimento}</Text> 
                                    }
                                </View>
                                

                                <View style={{flexDirection:"row"}}>
                                    <MaterialCommunityIcons name="gender-male-female" size={12} color={"#5E4E90"} style={styles.form_icon}/>
                                    <Text style={styles.form_label}>Gênero:</Text>
                                </View>
                            
                                <View>
                                    <Text style={styles.form_text}>{genero}</Text> 
                                </View>

                                {
                                    edit ?
                                    <View style={{marginTop: 16}}>
                                        <ButtonConfirmComponent title="Salvar" onClick={handleSubmit}/>
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