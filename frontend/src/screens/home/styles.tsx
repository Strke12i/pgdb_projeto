import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { defaultColor, backgroundColor } from "../../utils/consts";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: 'center', // horizontal
        justifyContent: 'center', // vertical
        display: 'flex',
        flexGrow: 1,
    },
    scrollview_aulas:{
        borderColor: backgroundColor,
        borderWidth: 0.5,
        borderRadius: 20,
        width: "100%",
        padding: 16,
        backgroundColor: '#F4EEFF',
    },
    grid_aulas:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4EBFF',
        width: Dimensions.get('window').width - 32,
        height: Dimensions.get("window").height / 2 ,
        top: 0,
        marginTop: 16,
        borderColor: '#FFF',
        borderRadius: 20,
        borderWidth: 2,
        padding: 20,  
        marginBottom: 20,
    },
    title:{
        textAlign: 'center',
        fontSize: 20,
        color: defaultColor,
        marginBottom: 8,
        top: 8
    },

    grid_information:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    text_disciplina:{
        fontSize: 16,
        color: defaultColor,
        fontWeight: 'bold',
        textShadowColor: '#FFF',
        textDecorationLine: 'underline',
        textDecorationColor: defaultColor,
    },

    text_conteudo:{
        fontSize: 12,
        color: defaultColor,
    },

    grid_humor:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F4EBFF',
        width:280,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },

    humor_icon:{
        fontSize: 20,
    },

    humor_selected:{
        fontSize: 20,
        padding: 8,
        backgroundColor: defaultColor,
        borderRadius: 999,
    },

    grid_feedback:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F4EBFF',
        width:280,
        padding: 10,
        borderRadius: 20,
    },

    grid_button:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:220
    },

    grid_layout:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 64,
        marginBottom: 16
    },

    grid_layout_features:{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F4EBFF',
        width:140,
        borderRadius: 20,
        height: 120,
    },

    grid_sem_aulas:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    text_sem_aulas:{
        textAlign: 'center',
        fontSize: 20,
        color: defaultColor,
    },


});