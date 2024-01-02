import { View, Text, Image, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import { getIdentifier } from "../utils/getInformationsToken";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { baseUrl } from "../utils/consts";


export const NavigationBarComponent = () => {
    const [userImage, setUserImage] = useState(false);
    const {identifier} = getIdentifier();
   
    useEffect(() => {
        const getImage = async () => {
            if(identifier != 0){
                try{
                    const response = await axios.get(baseUrl + `/alunosImagem/${identifier}`);
                    if(response.status === 200){
                        setUserImage(true);
                    }
               }catch(error){
               }
            }
        }
        
        getImage();

    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.grid_logo}>
                <Text style={styles.title}>EvalMoji</Text>
                <Text style={styles.subtitle}>Your evaluation matters</Text>
            </View>
            
            <View style={styles.grid_icons}>
                <MaterialCommunityIcons name="bell-outline" size={32} color="#5E4E90" style={styles.bell_icon} />
                <Image
                    source={
                        userImage ? 
                        {uri: baseUrl + `/alunosImagem/${identifier}` } :
                        require('../assets/imgs/default.png')
                    }
                    style={styles.image} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#FFFFF4',
        justifyContent: "space-between",
    },
    image:{
        width: 40,
        height: 40,
        borderRadius: 999,
        marginRight: 8,
        borderColor: "#5E4E90",
    },
    grid_logo:{
        paddingLeft: 8,
        marginBottom: 20,
        marginTop: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: "#5E4E90",
        textAlign: 'center',
    },
    subtitle:{
        fontSize: 12,
        color: "#5E4E90",
        textAlign: 'center',
    },
    grid_icons:{
        display: 'flex',
        flexDirection: 'row',
        marginRight: 8,
        alignItems: 'center', 
    },
    bell_icon:{
        marginRight: 8,
    }
});
