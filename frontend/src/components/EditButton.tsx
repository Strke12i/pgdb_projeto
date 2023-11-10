import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native"

export const EditButton = (props: any) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <MaterialCommunityIcons
                name="account-edit"
                size={20}
                color={"#5E4E90"}
            />
        </TouchableOpacity> 
    )
}
const styles = StyleSheet.create({
    button:{
        width: 30,
        height: 30,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: '#F4EBFF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

