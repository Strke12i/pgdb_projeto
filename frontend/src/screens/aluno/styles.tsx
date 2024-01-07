import { Dimensions, StyleSheet } from "react-native";
import { backgroundColor, defaultColor, secondaryColor } from "../../utils/consts";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo:{
        display: 'flex',
        marginTop: -50,
    },
    logo_title:{
        fontSize: 30,
        color: defaultColor,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },

    logo_subtitle:{
        textAlign: 'center',
    },

    user_img:{
        width: Dimensions.get('window').height/ 6,
        height: Dimensions.get('window').height/ 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: defaultColor,
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
        width: Dimensions.get('window').width - 64,
        borderWidth:2,
        borderRadius: 20,
        borderColor:"#FFFFFF",
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: secondaryColor,    
    },

    form_description:{
        textAlign: "left",
        fontSize: 14,
        color: defaultColor,
        marginBottom: 8,
    },

    form_label:{
        marginTop: 2,   
        fontSize: 14,
        color: defaultColor,
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
        color: defaultColor,
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
        color: defaultColor,
    },

    picker:{
        fontWeight:"bold",
        fontFamily: 'Roboto',
        color: defaultColor,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: -16
    },

    button_confirm:{
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    


})  