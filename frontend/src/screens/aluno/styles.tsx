import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFF9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo:{
        display: 'flex',
        marginTop: -50,
    },
    logo_title:{
        fontSize: 30,
        color: '#5E4E90',
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },

    logo_subtitle:{
        textAlign: 'center',
    },

    user_img:{
        width:100,
        height:100,
        borderRadius: 999,
        borderWidth:1,
        borderColor:"#5E4E90",
        marginTop: 16,
    },
    user_edit_button:{
        position: 'absolute',
        right: 0,
        top: 15,
    },

    form_container:{
        marginTop: 20,
        display: 'flex',
        padding: 16,
        width:300,
        borderWidth:2,
        borderRadius: 20,
        borderColor:"#FFFFFF",
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor:'#F4EBFF',    
    },

    form_description:{
        textAlign: "left",
        fontSize: 14,
        color: '#5E4E90',
        marginBottom: 8,
    },

    form_label:{
        marginTop: 2,   
        fontSize: 14,
        color: '#5E4E90',
        fontWeight: 'bold',
    },

    form_icon:{
        marginTop: 4,   
        marginRight: 4,
    },

    form_text:{
        marginTop: 2,   
        fontSize: 16,
        marginLeft: 16,
        fontFamily: 'Roboto',
        color: '#5E4E90',
    }
    ,
    form_edit_button:{
        position: 'absolute',
        right: 0,
        top: 0,
        marginTop: -15,
    },

    text_date:{
        marginTop: 2,   
        fontSize: 16,
        fontWeight:"bold",
        fontFamily: 'Roboto',
        color: '#5E4E90',
    },

    picker:{
        fontWeight:"bold",
        fontFamily: 'Roboto',
        color: '#5E4E90',
        borderWidth: 1,
        borderColor: '#000',
        marginTop: -16
    }



})  