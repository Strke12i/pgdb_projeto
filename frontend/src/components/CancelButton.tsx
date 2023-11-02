import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity , StyleSheet} from "react-native";

export const CancelButton = (props: any) => {
    return(
        <TouchableOpacity 
            onPress={props.onPress}
            style={styles.button}
            > 
            <MaterialIcons
                name="cancel"
                size={20}
                color={"red"}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 999,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'center',
    }
});