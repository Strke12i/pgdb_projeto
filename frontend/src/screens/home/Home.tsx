import { View, ScrollView, Text, SafeAreaView, Pressable, TextInput } from "react-native";
import { styles } from "./styles";
import { NavBar } from "../../components/NavBar";
import { NavigationBarComponent } from "../../components/NavigationBarComponent";
import { getIdentifier } from "../../utils/getInformationsToken";
import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/consts";
import axios from "axios";
import FlashMessage from "react-native-flash-message";
import { DangerMessage, SuccessMessage } from "../../utils/Messages";
import ButtonConfirmComponent from "../../components/ButtonConfirmComponent";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ModalComponent } from "../../components/ModalComponent";
import { RootStackParamList } from "../rootStackParams";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

type Aula = {
	codigoAula: number;
	conteudo: string;
	data: Date;
}

type Props = StackNavigationProp<RootStackParamList, "Home">;

export const Home = () => {
    const [modalAvaliacao, setModalAvaliacao] = useState(false);
    const [humor, setHumor] = useState(0); // 0 - 5 [0,1,2,3,4,5]
    const [feedback, setFeedback] = useState(""); 
	const [aulas, setAulas] = useState<Aula[]>([]);
	const [codigoAula, setCodigoAula] = useState(0);
    const { identifier, role } = getIdentifier();
	const navigation = useNavigation<Props>();

    const submitAvaliacao = async () => {
        try{
			console.log("aaaa");
			const response = await axios.post(`${baseUrl}/avaliacoes`, {
				codigoAula,
				matricula: identifier,
				notaAvaliacao: humor,
				descricao: feedback
			});

			if(response){
				console.log("Avaliação enviada com sucesso!");
				
				SuccessMessage(response.data.message);
				setAulas(aulas.filter(aula => aula.codigoAula != codigoAula));
				setCodigoAula(0);
				setModalAvaliacao(false);
			}
			
			
		}catch(error){
			DangerMessage("Erro ao enviar avaliação!");
		}
    }

	useEffect(() => {
		const getAulas = async () => {
			try{
				let response;
				if(role == "professor"){
					response = await axios.get(`${baseUrl}/aulas/professor/${identifier}`);
				}else{
					response = await axios.get(`${baseUrl}/avaliacoes/aluno/${identifier}`);
				}
				
				if(response.data.aulas){
					setAulas(response.data.aulas);
				}

			}catch(error){
				DangerMessage("Erro ao carregar aulas!");
			}	
		}
		getAulas();
		
	}, []);

    return (	
      <SafeAreaView style={styles.container}>
		
        <NavigationBarComponent />
        <ModalComponent visible={modalAvaliacao} setVisible={setModalAvaliacao}>
            <Text style={styles.title}>Avaliação</Text>
              <View>
                <Text style={styles.text_conteudo}>Como você se sentiu durante essa aula?</Text>
              </View>
                    <View style={styles.grid_humor}>
                        <Text style={ humor == 0 ? styles.humor_selected : styles.humor_icon }
                            onPress={() => setHumor(0)}>&#128525;</Text>
                        <Text style={ humor == 1 ? styles.humor_selected : styles.humor_icon }
                            onPress={() => setHumor(1)}>&#128545;</Text>
                <Text style={ humor == 2 ? styles.humor_selected : styles.humor_icon }
                            onPress={() => setHumor(2)}>&#128548;</Text>
                <Text style={ humor == 3 ? styles.humor_selected : styles.humor_icon }
                            onPress={() => setHumor(3)}>&#128564;</Text>
                <Text style={ humor == 4 ? styles.humor_selected : styles.humor_icon }
                            onPress={() => setHumor(4)}>&#128565;</Text>
                <Text style={ humor == 5 ? styles.humor_selected : styles.humor_icon }
                            onPress={() => setHumor(5)}>&#129299;</Text>
                    </View>

              <View>
                <Text style={styles.text_conteudo}>Dê o seu feedback da aula:</Text>
              </View>

              <View style = {styles.grid_humor}>
                <TextInput style={{padding:10}} placeholder="Digite aqui seu feedback"
                  multiline
                  maxLength={255} 
                  value={feedback}
                  onChangeText={setFeedback}
                  />
              </View>

              <ButtonConfirmComponent title={"Enviar"} onClick={submitAvaliacao} />
              
            
        </ModalComponent> 

				<View style={styles.grid_aulas}>
				<Text style={styles.title}>Minhas Aulas</Text>
				<ScrollView style={styles.scrollview_aulas}>
					<View style={styles.grid_information}>
						{
							aulas.map((aula: Aula) => {
								return(
									<View key={aula.codigoAula}>
										<Text style={styles.text_disciplina}>{aula.conteudo}</Text>
										<View style={styles.grid_button}>
											<View style={{flexDirection:"row"}}>
												<Text style={styles.text_conteudo}>{aula.conteudo}</Text>
												<Text style={styles.text_conteudo}>-</Text>
												<Text style={styles.text_conteudo}>{aula.data.toString().split("T")[0]}</Text>
											</View>
											{
												role == "aluno" ? (
													<Pressable onPress={() => { 
														setModalAvaliacao(true);
														setCodigoAula(aula.codigoAula);
														}}>
														<AntDesign name="star" size={20} color="#fcca04" />
													</Pressable>
												): (
													<Pressable onPress={
														() => {
															navigation.navigate("Aula", { codigoAula: aula.codigoAula })
														}
													}>
														<Entypo name="bar-graph" size={20} color="#5E4E90" />
													</Pressable>
												)

											}
											
										</View>
										
									</View>
								);
							})
						}
					</View>
				</ScrollView>
				</View>

		<View style={styles.grid_layout}>
			<View style={styles.grid_layout_features}>
				<Text style={styles.text_disciplina}>Minhas Turmas</Text>
				<FontAwesome name="users" size={32} color="#5E4E90" onPress={() => navigation.navigate("Turmas")}/>
			</View>

			<View style={styles.grid_layout_features}>
				<Text style={styles.text_conteudo}>Em Breve...</Text>
				<FontAwesome name="calendar" size={32} color="#5E4E90" />
			</View>
		</View>

        <FlashMessage position="top" />
        <NavBar />
      </SafeAreaView>
    );

};
