import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFF4',
        alignItems: 'center', // horizontal
        justifyContent: 'center', // vertical
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    scrollview:{
        marginTop: 80,
        width: 300,
    },
    title:{
        textAlign: 'center',
        fontSize: 24,
        color: '#5E4E90',
        marginTop:8,
    },
    grid_back:{
        width: 300,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8,
        marginLeft: -16
    },
    back:{
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: '#F4EBFF',
        borderRadius: 999,
    },
    info:{
        width: 300,
        height: "auto",
        backgroundColor: '#F4EBFF',
        alignContent: 'flex-start',
        padding: 20,
        borderRadius: 20,
        borderColor: '#FFF',
        marginBottom: 12,
    },
    info_label:{  
        marginTop: 2,   
        fontSize: 14,
        marginLeft: 4,
        color: '#5E4E90',
        fontWeight: 'bold',
    },
    info_row:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    info_text:{   
        fontSize: 16,
        marginLeft: 16,
        fontFamily: 'Roboto',
        color: '#5E4E90',
    },
    edit_button:{
        position: 'absolute',
        right: 0,
        top: -8,
        backgroundColor: '#F4EBFF',
        borderRadius: 999,
    },
    alunos_text:{
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#5E4E90',
        marginBottom: 8,
    },
    alunos_button_grid:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    view_button_alunos:{
        width: "auto",
        height: "auto",
        backgroundColor: '#F4EBFF',
        alignContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#FFF',
        borderRadius: 20,
        borderWidth: 2,
        marginTop: 4,
        paddingRight: 8,
        alignItems: 'center',
    },
    view_button_alunos_icon:{
        marginLeft:8
    },
    view_button_alunos_text:{
        marginLeft: 4,
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#5E4E90',
        fontWeight: 'bold',
    },
    modal_date:{
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#5E4E90',
    },

    row_list:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: 300,
        flexWrap: 'wrap',
        borderColor: '#5E4E90',
        marginTop: 4,
        padding: 4,
        borderBottomWidth:1
    },

    row_list_text:{
        flexDirection: 'row',
        justifyContent: "center",
    },

    add_turma_button:{
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#5E4E90',
        borderRadius: 999,
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
});