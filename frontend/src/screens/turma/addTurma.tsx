import {View, Text} from "react-native";
import {styles} from "./styles";  
import {getIdentifier} from "../../utils/getInformationsToken";

export const AddTurma = () => {
    const {identifier, role} = getIdentifier();
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AddTurma</Text>
        </View>
    );
}