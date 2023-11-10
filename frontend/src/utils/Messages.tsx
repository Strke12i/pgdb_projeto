import { showMessage } from "react-native-flash-message";

export const DangerMessage = (message: string) => {
    showMessage({
        message: message,
        type: "danger",
        icon: "danger",
        duration: 3000,
    });
}

export const SuccessMessage = (message: string) => {
    showMessage({
        message: message,
        type: "success",
        icon: "success",
        duration: 3000,
    });
}