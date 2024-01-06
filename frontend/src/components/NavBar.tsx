import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../screens/rootStackParams";
import { useEffect, useState } from "react";

type NavBarProps = StackNavigationProp<RootStackParamList, 'Perfil'>;

export const NavBar = () => {

    const {onLogout} = useAuth();
    const navigation = useNavigation<NavBarProps>();
    const [keyboardActive, setKeyboardActive] = useState(false);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardActive(true); // or some other action
            }
            );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardActive(false); // or some other action
            }
            );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        }
    }, [])


    return(
        <>
        {
            !keyboardActive ? (
                <View style={styles.container}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="account" size={36} color="#FFFFF4" style={styles.icons_secundary} onPress={() => navigation.navigate("Perfil")}/>
                </TouchableOpacity>
               
               <TouchableOpacity>
                    <MaterialCommunityIcons name="home-circle" size={44} color="#FFFFF4" style={styles.home} onPress={() => navigation.navigate("Home")}/>
               </TouchableOpacity>
                
                <TouchableOpacity>
                    <MaterialCommunityIcons name="logout" size={36} color="#FFFFF4" style={styles.icons_secundary} onPress={onLogout}/>
                </TouchableOpacity>
            </View>
            ) : ""
        }

        </>
       
    )

}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#42307D',
        justifyContent: "space-around",
    },

    icons_secundary:{
        marginTop: 10,
    },

    home:{
        top: 0,
        
    }

});