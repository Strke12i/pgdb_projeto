import { TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface TextInputComponentProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void | undefined | NativeSyntheticEvent<TextInputChangeEventData> ;
    maxLength: number;
    passwordRules?: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad";
}

const TextInputComponent = (props: TextInputComponentProps ) => {
    return (
        <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        maxLength={props.maxLength}
        style = {styles.input}
        passwordRules={props.passwordRules}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 'auto',
        width: 250,
        paddingLeft: 10,
        borderBottomColor: '#5E4E90',
        borderBottomWidth: 0.7,
        color: "#5E4E90",
        fontSize: 16,
        
    },  
})

export default TextInputComponent;