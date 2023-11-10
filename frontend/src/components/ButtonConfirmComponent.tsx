import { Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";

const ButtonConfirmComponent = (props: any) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onClick}
            activeOpacity={0.7}
            >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F4EBFF",
        borderRadius: 30,
        borderWidth: 3,
        width: 250,
        height: 40,
        borderColor: "#FFFFFF"
    },
    button_focus: {
        backgroundColor: "#F4EBFF",
        borderRadius: 30,
        borderWidth: 3,
        width: 250,
        height: 40,
        borderColor: "#5E4E90"
    }
    ,
    text:{
        textAlign: "center",
        marginTop: 3,
        color: "#5E4E90",
        fontSize: 18,
    }
});



export default ButtonConfirmComponent;