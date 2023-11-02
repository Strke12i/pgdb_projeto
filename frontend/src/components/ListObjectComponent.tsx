import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const ListObjectComponent = (props: any) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.textPrimary}</Text>
            <Text style={styles.text_secundary}>{props.textSecundary}</Text>
            {
                props.onDeleteObject ? (
                    <AntDesign name="delete" size={20} color="red" style={styles.icon} onPress={props.onDeleteObject}/>
                ):
                ""
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        width: 280,
        flexWrap: 'wrap',
        borderColor: '#5E4E90',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        padding: 10,
    },
    text:{
        fontSize: 16,
        color: '#5E4E90',
        marginLeft: 10,
    },
    text_secundary:{
        fontSize: 16,
        color: '#4230AD',
        marginLeft: 10,
    },
    icon:{
        marginLeft: 10,
    }
});