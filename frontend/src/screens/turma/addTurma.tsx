import {View, Text} from "react-native";
import {styles} from "./styles";  
import {getIdentifier} from "../../utils/getInformationsToken";
import TextInputComponent from "../../components/TextInputComponent";
import {useState} from "react";
import { NavBar } from "../../components/NavBar";
import { NavigationBarComponent } from "../../components/NavigationBarComponent";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { DangerMessage, SuccessMessage } from "../../utils/Messages";
import { baseUrl } from "../../utils/consts";
import axios from "axios";
import ButtonConfirmComponent from "../../components/ButtonConfirmComponent";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../rootStackParams";
import { useNavigation } from "@react-navigation/native";

type AddTurmaProps = StackNavigationProp<RootStackParamList, 'AddTurma'>;

const AddTurma = () => {
    const {identifier} = getIdentifier();
    const [Disciplina, setDisciplina] = useState<string>("");
    const [ano, setAno] = useState<string>("");
    const [semestre, setSemestre] = useState<string>("");
    const navigation = useNavigation<AddTurmaProps>();

    const handleAddTurma = async () => {
        if(Disciplina === "" || ano === "" || semestre === ""){
            showMessage({
                message: "Erro",
                description: "Preencha todos os campos!",
                type: "danger",
                icon: "danger",
            });
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}/turmas`, {
                codigoProfessor: identifier,
                disciplina: Disciplina,
                ano,
                serie: semestre
            });
            
          
            setDisciplina("");
            setAno("");
            setSemestre("");
            SuccessMessage("Turma adicionada com sucesso!");
            navigation.navigate("Home");
        } catch (err) {
            DangerMessage("Erro ao adicionar turma");
        }
    }
    
    return (
        <View style={styles.container}>
            <NavigationBarComponent />
            <Text style={styles.title}>Adicionar Turma</Text>
            <View style={{marginTop:20}}>
                <View style={styles.grid_placeholder}>
                    <Text style={styles.placeholder}>Disciplina</Text>
                    <TextInputComponent
                        value={Disciplina}
                        onChangeText={setDisciplina}
                        maxLength={50}
                    />
                </View>

                <View style={styles.grid_placeholder}>
                    <Text style={styles.placeholder}>Ano</Text>
                    <TextInputComponent
                        value={ano}
                        onChangeText={setAno}
                        maxLength={4}
                    />
                </View>

                <View style={styles.grid_placeholder}>
                    <Text style={styles.placeholder}>Semestre</Text>
                    <TextInputComponent
                        value={semestre}
                        onChangeText={setSemestre}
                        maxLength={2}
                    />
                </View>

                <View style={{marginTop:16}}>
                    <ButtonConfirmComponent title="Adicionar" onClick={handleAddTurma} />
                </View>
               
            </View>

            <NavBar />
            <FlashMessage position="top" />
        </View>
    );
}

export default AddTurma;