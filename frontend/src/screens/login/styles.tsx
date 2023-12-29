import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFE',
        alignItems: 'center', // horizontal
        display: 'flex',
        flexGrow: 1,
        borderWidth: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "#5E4E90",
    },
    grid_logo:{
        top: 0,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 1,
    },
    grid_placeholder: {
        display: 'flex',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr',
        alignItems: 'flex-start',
        marginTop: 8
    },
    placeholder: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#5E4E90",
        paddingLeft:10,
    },
    grid_password:{
       flexDirection: 'row',

    },
    grid_buttons:{
        marginTop: 20,
        display: 'flex',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        alignItems: 'flex-start',
        gap: 12
    },
    grid_forget:{
        display: 'flex',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr',
        alignItems: 'flex-start',
    },
    forget_password:{
        color: "#5E4E90",
        fontSize: 14,
        paddingLeft: 10,
    },
    line:{
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        width: 250,
    },
    icon:{
        marginTop: 4,
        right: 4,
        position: 'absolute',
    },
    radio_button_container:{
        marginTop: -10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    professor_text:{
        color: "#5E4E90",
        fontSize: 14,
        paddingLeft: 10,
    },
    logo:{
        width: 200,
        height: 200,
        borderRadius: 999,
    }
})

export default styles;