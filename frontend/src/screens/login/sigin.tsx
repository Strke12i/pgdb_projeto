import { View, Text } from "react-native";
import styles from "./styles";
import {useState} from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextInputComponent from "../../components/TextInputComponent";
import ButtonConfirmComponent from "../../components/ButtonConfirmComponent";
import {RadioButton} from "react-native-paper";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../rootStackParams";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useAuth } from "../../context/AuthContext";
import {Switch} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type SignUpScreenProps = StackNavigationProp<RootStackParamList, "SignIn">;

const SignUpScreen = (props:any) => {
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [secureTextEntry2, setSecureTextEntry2] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isProfessor, setisProfessor] = useState(false);
    const [checked, setChecked] = useState(false);
    const {onRegister} = useAuth();
    const navigation = useNavigation<SignUpScreenProps>();

    const showPassword = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const showPassword2 = () => {
        setSecureTextEntry2(!secureTextEntry2)
    }

    const toggleSwitch = () => {
        setisProfessor(!isProfessor)
    }

    const handleSignUp = async () => {
        if(nome === "" || matricula === "" || senha === "" || confirmPassword === ""){
            showMessage({
                message: "Erro",
                description: "Preencha todos os campos!",
                type: "danger",
                icon: "danger",
                });
                return;
        }

        try{
            if(senha !== confirmPassword){
                throw new Error("As senhas não coincidem");
            }

            if(!checked){
                throw new Error("Você precisa aceitar os termos de uso");
            }

            if(onRegister){
                const result = await onRegister(parseInt(matricula), senha, nome, isProfessor ? "professor" : "aluno");

                if(result.error){
                    throw new Error(result.message);
                }

                showMessage({
                    message: "Sucesso",
                    description: "Usuário cadastrado com sucesso!",
                    type: "success",
                    icon: "success",
                })

                navigation.navigate("Login");

            }else{
                throw new Error("Função não encontrada");
            }
        }catch(error){
            showMessage({
                message: "Erro",
                description: (error as Error).message,
                type: "danger",
                icon: "danger",
                });
                return;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.grid_logo}>
                <MaterialCommunityIcons 
                    name="account-circle"
                    size={100}
                    color={"#5E4E90"}
                />
            <Text style={styles.title}>App Educação</Text>
            <Text>Aqui a gente educa!</Text>
            </View>

            <View style={styles.grid_placeholder}>
                <Text style={styles.placeholder}>Nome</Text>
                <TextInputComponent
                    value={nome}
                    onChangeText={setNome}
                    maxLength={30}
                />
            </View>
            
            <View style={styles.grid_placeholder}>
                <Text style={styles.placeholder}>{isProfessor ? "Código do Professor" : "Matrícula"}</Text>
                <TextInputComponent
                    value={matricula}
                    onChangeText={setMatricula}
                    maxLength={8}
                />
            </View>

            <View style={styles.grid_placeholder}>
                <Text style={styles.placeholder}>Senha</Text>
                <View style={styles.grid_forget}>
                    <View style={styles.grid_password}>
                        <TextInputComponent
                            value={senha}
                            onChangeText={setSenha}
                            maxLength={30}
                            passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 6; maxlength: 30; prohibited: whitespace; secure-text: true; hidden: true;"
                            secureTextEntry={!secureTextEntry}
                        />

                        <MaterialCommunityIcons 
                            name={secureTextEntry ? "eye-off" : "eye"}
                            size={24}
                            color={"#5E4E90"}
                            onPress={showPassword}
                            style={styles.icon}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.grid_placeholder}>
                <Text style={styles.placeholder}>Confirmar Senha</Text>
                <View style={styles.grid_forget}>
                    <View style={styles.grid_password}>
                        <TextInputComponent
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            maxLength={30}
                            passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 6; maxlength: 30; prohibited: whitespace; secure-text: true; hidden: true;"
                            secureTextEntry={!secureTextEntry2}
                        />

                        <MaterialCommunityIcons 
                            name={secureTextEntry2 ? "eye-off" : "eye"}
                            size={24}
                            color={"#5E4E90"}
                            onPress={showPassword2}
                            style={styles.icon}
                        />
                    </View>
                </View>
            </View>


            <View style={styles.grid_buttons}>
                <View style={styles.radio_button_container}>
                    <RadioButton 
                    value="Check"
                    status={checked? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                    />
                    <Text>Eu aceito os termos de uso</Text>
                </View>

                <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Text style={styles.professor_text}>Sou professor</Text>
                        <Switch 
                            trackColor={{ false: "#F4EBFF", true: "#5E4E90" }}
                            thumbColor={isProfessor ? "#ffffff" : "#ffffff"}
                            onValueChange={toggleSwitch}
                            value={isProfessor}
                        />
                    </View>
                <ButtonConfirmComponent 
                    title="Sing in"
                    onClick={handleSignUp}
                />
                <View style={styles.line}></View>

                <ButtonConfirmComponent 
                    title="Log in"
                    onClick={() => navigation.navigate("Login")}
                />
            </View>

            <FlashMessage position="top" />
        </View>
    );
}

export default SignUpScreen;