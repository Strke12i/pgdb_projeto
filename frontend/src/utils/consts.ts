import { Platform } from "react-native";

export const baseUrl = Platform.OS == "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";


export const defaultColor = "#5E4E90";
export const secondaryColor = "#F4EBFF";
export const backgroundColor = "#FFFFF4";