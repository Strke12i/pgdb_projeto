import React from 'react';
import { useState } from 'react';
import { View, Image, Text, useColorScheme } from 'react-native';
import TextInputComponent from '../../components/TextInputComponent';
import ButtonConfirmComponent from '../../components/ButtonConfirmComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { Switch } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../rootStackParams';
import { SafeAreaView } from 'react-native-safe-area-context';

type loginScreenProps = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const [isProfessor, setisProfessor] = useState(false);
    const {onLogin} = useAuth();
    const navigation = useNavigation<loginScreenProps>();

    const showPassword = () => {
        setSecureTextEntry(!secureTextEntry)
    }

    const toggleSwitch = () => {
        setisProfessor(!isProfessor)
    }	

    const handleSignIn = () => {
        navigation.navigate("SignIn");
    }

    const handleLogin = async () => {
        
        if(matricula === "" || senha === ""){
            showMessage({
                message: "Erro",
                description: "Preencha todos os campos!",
                type: "danger",
                icon: "danger",
                });
            return;
        }

        try{
            if (onLogin) {
               const result = await onLogin!(parseInt(matricula), senha, isProfessor ? "professor" : "aluno"); 
               
               if(result.error){
                throw new Error(result.message);
                }

                showMessage({
                    message: "Sucesso",
                    description: "Login realizado com sucesso!",
                    type: "success",
                    icon: "success",
                })
            } else {
                console.log("onLogin não definido");
                
            }
        } catch(error){
            showMessage({
                message: "Erro",
                description: "Matrícula ou senha incorretos!",
                type: "danger",
                icon: "danger",
            });
        }
    };

    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.grid_logo}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>EvalMoJi</Text>
                <Text style={styles.subtitle}>your evaluation matters</Text>

            </View>

            <View style={styles.grid_placeholder}>
                <Text style={styles.placeholder}>Matrícula</Text>
                <TextInputComponent
                    value={matricula}
                    onChangeText={setMatricula}
                    maxLength={10}
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
                    <Text style={styles.forget_password} onPress={() => {}}>Esqueceu sua senha?</Text>

                    <View style={styles.professor_grid}>
                        <Text style={styles.professor_text}>Sou professor</Text>
                        <Switch 
                            trackColor={{ false: "#F4EBFF", true: "#5E4E90" }}
                            thumbColor={isProfessor ? "#ffffff" : "#ffffff"}
                            onValueChange={toggleSwitch}
                            value={isProfessor}
                            style={styles.switch_button}
                        />
                    </View>
                    

                    
                </View>
            </View>

            <View style={styles.grid_buttons}>
                <ButtonConfirmComponent 
                    title="Log in"
                    onClick={handleLogin}
                />
                <View style={styles.line}></View>

                <ButtonConfirmComponent 
                    title="Sign in"
                    onClick={handleSignIn}
                />
            </View>

            <FlashMessage position="top" />
        </SafeAreaView>
    );
};

export default Login;
