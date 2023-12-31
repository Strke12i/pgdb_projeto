import { StyleSheet } from 'react-native';
import { backgroundColor, defaultColor } from '../../utils/consts';
import { Dimensions } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: defaultColor,
    },
    subtitle: {
        fontSize: 16,
        color: defaultColor,
    },
    grid_logo:{
        top: 0,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000000',
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
        color: defaultColor,
        paddingLeft:10,
        marginBottom: 2 ,
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
        gap: 12,
        marginBottom: 20,
    },
    grid_forget:{
        display: 'flex',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr',
        alignItems: 'flex-start',
    },
    forget_password:{
        color: defaultColor,
        fontSize: 14,
        paddingLeft: 10,
        marginBottom: 8,
    },
    line:{
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        width: 250,
    },
    icon:{
        bottom: 4,
        right: 4,
        position: 'absolute',
    },
    radio_button_container:{
        marginTop: -10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch_button:{
        marginLeft: 4
    },

    professor_text:{
        color: defaultColor,
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