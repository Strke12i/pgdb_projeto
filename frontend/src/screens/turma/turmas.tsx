import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { NavBar } from "../../components/NavBar";
import { NavigationBarComponent } from "../../components/NavigationBarComponent";
import { getIdentifier } from "../../utils/getInformationsToken";
import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/consts";
import axios from "axios";
import FlashMessage from "react-native-flash-message";
import { DangerMessage, SuccessMessage } from "../../utils/Messages";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../rootStackParams";
import { useNavigation } from "@react-navigation/native";


type TurmasScreenProps = StackNavigationProp<RootStackParamList, 'Turmas'>;

type Turma = {
    codigoTurma: number,
    professor: {
        nomeProfessor: string,
        codigoProfessor: number,
    },
    disciplina: string,
}

export const Turmas = () => {
    const { identifier, role } = getIdentifier();
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const navigation = useNavigation<TurmasScreenProps>();

    useEffect(() => {
        const getTurmas = async () => {
            try {
                if(role === "professor"){
                    const response = await axios.get(`${baseUrl}/turmas/professor/${identifier}`);
                    setTurmas(response.data.turmas);
                    
                }else{
                    const response = await axios.get(`${baseUrl}/alunos/turmas/${identifier}`);
                    setTurmas(response.data.turmas);
                }
                
            } catch (err) {                
                DangerMessage("Erro ao buscar turmas");
            }

        }
        getTurmas();    
    }, []);

    return (
        <View style={styles.container}>
            <NavigationBarComponent />
            
            <ScrollView style={styles.scrollview}>
                <Text style={styles.title}>Turmas</Text>
                <TouchableOpacity style={styles.add_turma_button} onPress={() => navigation.navigate("AddTurma")}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
                <View>
                    {turmas.map((turma) => {
                    return (
                        <View key={turma.codigoTurma} style={styles.row_list}>
                            <TouchableOpacity style={styles.row_list_text} onPress={() => navigation.navigate("Turma",
                                {
                                    codigoTurma: turma.codigoTurma
                                }
                                ) }>
                                <Text style={styles.alunos_text}>{turma.disciplina}</Text>
                                <Text style={styles.alunos_text}> - </Text>
                                <Text style={styles.alunos_text}>{turma.codigoTurma}</Text>
                            </TouchableOpacity>
                            
                            <Text style={styles.info_text}>{turma.professor.nomeProfessor}</Text>
                        </View>
                    );
                })}
                </View>
                
            </ScrollView>

            <NavBar />
            <FlashMessage position="top" />
        </View>
    )
};
