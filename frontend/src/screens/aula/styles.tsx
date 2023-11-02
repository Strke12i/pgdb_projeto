import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFF4',
        alignItems: 'center', // horizontal
        justifyContent: 'center', // vertical
        display: 'flex',
        flexGrow: 1,
    },

    title:{
        textAlign: 'center',
        fontSize: 20,
        color: '#5E4E90',
        marginBottom: 8,
    },

    grid_center:{
        width: "100%",
        alignItems: 'center',
    },
    grid_information:{
        display: 'flex',
        width: 300,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: '#F4EBFF',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFF',
        padding: 20,
    },

    text_label: {
        fontSize: 12,
        color: '#5E4E90',
        textShadowColor: '#FFF',
    },
    
    text_information:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5E4E90',
    },

    grid_text:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    grid_scrollview:{
        display: 'flex',
        width: 380,
        height: 500,
        justifyContent: "center",
    },

    grid_avaliacao:{
        display: 'flex',
        marginTop: 8,
        width: "auto",
        padding: 10,
    },

    avaliacao_text_grid:{
        flexDirection: 'row',
        marginTop: 2
    },

    avaliacao_text:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5E4E90',
    },
    
});