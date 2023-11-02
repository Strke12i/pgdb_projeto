import {View, Text, TouchableOpacity, ScrollView, FlatList, Alert} from 'react-native';
import {styles} from './styles';
import { NavigationBarComponent } from '../../components/NavigationBarComponent';
import { NavBar } from '../../components/NavBar';
import { getIdentifier } from '../../utils/getInformationsToken';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { EditButton } from '../../components/EditButton';
import { useState, useEffect } from 'react';
import TextInputComponent from '../../components/TextInputComponent';
import { ModalComponent } from '../../components/ModalComponent';
import axios from 'axios';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { ListObjectComponent } from '../../components/ListObjectComponent';
import ButtonConfirmComponent from '../../components/ButtonConfirmComponent';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


type newAlunoProps = {
	matricula: number;
	nomeAluno: string;
}

type AulaProps = {
	data: Date,
	conteudo: string,
	codigoAula: number
}

export const Turma = (props: any) => {
	const codigoTurma = props.route.params.codigoTurma;
		const [disciplina, setDisciplina] = useState('');
		const [ano, setAno] = useState('');
		const [serie, setSerie] = useState('');
		const [professor, setProfessor] = useState('');
		const [codigoProfessor, setCodigoProfessor] = useState(0);
		const [modalListAlunos, setModalListAlunos] = useState(false);
		const [modalAddAluno, setModalAddAluno] = useState(false);
		const [modalListAulas, setModalListAulas] = useState(false);
		const [modalAddAula, setModalAddAula] = useState(false);
		const [alunos, setAlunos] = useState<newAlunoProps[]>([]);
		const [newAlunoMatricula, setNewAlunoMatricula] = useState('');
		const [newAluno, setNewAluno] = useState<newAlunoProps>();
		const [aulas, setAulas] = useState<AulaProps[]>([]);
		const [newAulaDate, setNewAulaDate] = useState(new Date());
		const [newAulaConteudo, setNewAulaConteudo] = useState('');

		const [edit, setEdit] = useState(false);
	    const {role} = getIdentifier();
		const navigation = useNavigation();

	const handleEdit = () => {
		setEdit(!edit);
	}

	const editTurma = async () => {
		try{
			await axios.put("http://10.0.2.2:3000/turmas", {
				codigoTurma,
				disciplina,
				ano,
				serie,
				codigoProfessor
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			
			});
		
			showMessage({
				message: "Turma editada com sucesso",
				type: "success",
				icon: "success",
				duration: 3000,
			});

			handleEdit();
		}catch(error){
			console.log(error);
			
			showMessage({
				message: "Erro ao editar turma",
				type: "danger",
				icon: "danger",
				duration: 3000,
			});
		}
	}

	const handleListAlunos = () => {
		setModalListAlunos(!modalListAlunos);
	}

	const deleteAluno = async (matricula: number) => {
		try{
			const response = await axios.delete("http://10.0.2.2:3000/turmas/aluno",
				{
					data:{
						codigoTurma,
						matricula
					},
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if(response){
				showMessage({
					message: "Aluno deletado com sucesso",
					type: "success",
					icon: "success",
					duration: 3000,
				});
				setAlunos(alunos.filter(aluno => aluno.matricula !== matricula));
			}
			
			
		} catch(error){
			showMessage({
				message: "Erro ao deletar aluno",
				type: "danger",
				icon: "danger",
				duration: 3000,
			});
		}
	}

	const handleDeleteAluno = (matricula: number) => {
		Alert.alert("Deletar Aluno", `Deseja deletar o aluno com matricula: ${matricula}?`, [
			{
				text: "Não",
				onPress: () => {},
				style: "cancel"
			},
			{
				text: "Sim",
				onPress: () => {
					deleteAluno(matricula);
				},
				style: "default"
			},
		], {cancelable: false});
	}

	const getAluno = async () => {
		try{
			const response = await axios.get("http://10.0.2.2:3000/alunos/"+newAlunoMatricula,{
			});		
			
			return response.data.aluno;

			} catch(error){				
				showMessage({
					message: "Erro ao carregar aluno",
					type: "danger",
					icon: "danger",
					duration: 3000,
				});

				return null;
			}			
	}

	const addAluno = async () => {
		try{			
			const response = await fetch("http://10.0.2.2:3000/turmas/aluno", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					codigoTurma,
					matricula: newAluno?.matricula
				})
			});

			if(response.status === 200){
				showMessage({
					message: "Aluno adicionado com sucesso",
					type: "success",
					icon: "success",
					duration: 3000,
				});
				if(newAluno){
					setAlunos([...alunos, newAluno]);
				}
			}else{
				throw new Error();
			}
			
			
		}catch(error){
			showMessage({
				message: "Erro ao adicionar aluno",
				type: "danger",
				icon: "danger",
				duration: 3000,
			});
		}
	}

	useEffect(() => {
		if(newAluno){
			showMessageAddAluno();
		}
		
	}, [newAluno]);

	const handleAddAluno = async () => {
		const aluno = await getAluno();

		if(aluno){
			setNewAluno(aluno);
			setNewAlunoMatricula('');
		}	
	}

	const showMessageAddAluno = () => {
		Alert.alert("Adicionar Aluno", `Deseja adicionar o aluno ${newAluno?.matricula} - ${newAluno?.nomeAluno}?`, [
			{
				text: "Não",
				onPress: () => {},
				style: "cancel"
			},
			{
				text: "Sim",
				onPress: async () => {
					await addAluno();
				},
				style: "default"
			},
		], {cancelable: false});
	}

	useEffect(() => {
		const getAlunos = async () => {		
			try{
				if(!codigoTurma){
					throw new Error();
				}	
				const response = await axios.get("http://10.0.2.2:3000/turmas/alunos/"+codigoTurma);
				if(response.data.alunos){
					setAlunos(response.data.alunos);
				}
			
			}catch(error){
				showMessage({
					message: "Erro ao carregar alunos",
					type: "danger",
					icon: "danger",
					duration: 3000,
				});
			}
		}

		const getAulas = async () => {
			try{
				if(!codigoTurma){
					throw new Error();
				}
				const response = await axios.get("http://10.0.2.2:3000/turmas/aulas/"+codigoTurma);
				setAulas(response.data.aulas);
			} catch(error){
				showMessage({
					message: "Erro ao carregar aulas",
					type: "danger",
					icon: "danger",
					duration: 3000,
				});
			}
		}

		const getTurma = async () => {
			try{
				if(!codigoTurma){
					throw new Error();
				}
				const response = await axios.get("http://10.0.2.2:3000/turmas/get/"+codigoTurma);
				setDisciplina(response.data.turma.disciplina);
				setAno(response.data.turma.ano.toString());
				setSerie(response.data.turma.serie.toString());
				setProfessor(response.data.turma.professor.nomeProfessor);
				setCodigoProfessor(response.data.turma.professor.codigoProfessor);
			}catch(error){				
				showMessage({
					message: "Erro ao carregar turma",
					type: "danger",
					icon: "danger",
					duration: 3000,
				});	
		}
		}

		getTurma();
		if(role === 'professor'){
			getAlunos();
			getAulas();
		}
		
		
	}, [])

	const showDatePicker = async () => {
		DateTimePickerAndroid.open({
			value: newAulaDate,
			onChange: (event, selectedDate) => {
				if(selectedDate){
					setNewAulaDate(selectedDate);
				}
			},
			mode: "date",
			is24Hour: true,
		})
	}

	const addAula = async () => {
		try{
			if(!newAulaDate ||  !newAulaConteudo){
				throw new Error();
			}
			const response = await fetch("http://10.0.2.2:3000/aulas", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					codigoTurma,
					data: newAulaDate,
					conteudo: newAulaConteudo
				})
			});
			showMessage({
				message: "Aula adicionada com sucesso",
				type: "success",
				icon: "success",
				duration: 3000,
			});
		}catch(error){
			showMessage({
				message: "Erro ao adicionar aula",
				type: "danger",
				icon: "danger",
				duration: 3000,
			});
		}
	}

	const deleteAula = async (codigoAula: number) => {
		try{

			await axios.delete("http://10.0.2.2:3000/aulas", {
				data: {
					codigoAula
				},
				headers: {
					'Content-Type': 'application/json'
				}
			});

			setAulas(aulas.filter(aula => aula.codigoAula !== codigoAula));

			showMessage({
				message: "Aula deletada com sucesso",
				type: "success",
				icon: "success",
				duration: 3000,
			});
		} catch(error){
			console.log(error);
			
			showMessage({
				message: "Erro ao deletar aula",
				type: "danger",
				icon: "danger",
				duration: 3000,
			});
		}
	}

    return (
      
      <View style={styles.container}>
          <NavigationBarComponent />
		  
		  	<ModalComponent visible={modalListAlunos} setVisible={setModalListAlunos}>
				<Text style={styles.alunos_text}> Alunos </Text>
				<FlatList 
					data={alunos}
					renderItem={({item}) => 
						<ListObjectComponent 
							textPrimary={item["nomeAluno"]}
							textSecundary={item["matricula"]}
							onDeleteObject={() => handleDeleteAluno(item["matricula"])}/>
					}
				/>
			</ModalComponent>
			
			<ModalComponent visible={modalAddAluno} setVisible={setModalAddAluno}>
				<View>
					<Text style={styles.alunos_text}> Adicionar Aluno </Text>
					<TextInputComponent
						value={newAlunoMatricula}
						onChangeText={setNewAlunoMatricula}
						maxLength={20}
						keyboardType='numeric'
					/>

					<ButtonConfirmComponent title="Procurar Aluno" onClick={handleAddAluno}/>

				</View>
			</ModalComponent>
  
			<ModalComponent visible={modalListAulas} setVisible={setModalListAulas}>
				<Text style={styles.alunos_text}> Aulas </Text>
					<FlatList 
						data={aulas}
						renderItem={({item}) => 
							<ListObjectComponent 
								textPrimary={item["data"].toString().split('T')[0]}
								textSecundary={item["conteudo"]}
								onDeleteObject={() => deleteAula(item["codigoAula"])}		
								/>
						}
					/>
			</ModalComponent>

			<ModalComponent visible={modalAddAula} setVisible={setModalAddAula}>
					<View>
						<Text style={styles.alunos_text}> Adicionar Aula </Text>
						<TextInputComponent
							value={newAulaConteudo}
							onChangeText={setNewAulaConteudo}
							maxLength={50}
							placeholder='Conteúdo da aula'
						/>
						
						<ButtonConfirmComponent title="Adicionar Data" onClick={showDatePicker}/>
						{
							newAulaDate ? (
								<Text style={styles.modal_date}>{newAulaDate.toISOString().split("T")[0]}</Text>
								): ""
						}

						<ButtonConfirmComponent title="Adicionar Aula" onClick={addAula}/>
						
						
					</View>
			</ModalComponent>

		  <ScrollView style={styles.scrollview}>
		  	<View style={styles.grid_back}>
			  <AntDesign name="leftcircleo" size={28} color="#5e4e90"  style={styles.back} onPress={() => navigation.goBack() }/>
			</View>

			<View style={styles.info}>
				{
					role === 'professor' ? (
						<View style={styles.edit_button}>
							<EditButton onPress={handleEdit}/>
						</View>
					): ""
				}
				
				<View style={styles.info_row}>
					<AntDesign name="infocirlceo" size={12} color="#5E4E90" />
					<Text style={styles.info_label}>Disciplina:</Text>
				</View>
				{
					edit ? (
						<View style={{marginLeft: 16}}>
							<TextInputComponent
							value={disciplina}
							onChangeText={setDisciplina}
							maxLength={50}
						/>
						</View>
					) : <Text style={styles.info_text}>{disciplina}</Text>
				}

				<View style={styles.info_row}>
					<AntDesign name="book" size={12} color="#5E4E90" />
					<Text style={styles.info_label}>Série:</Text>
				</View>
				{
					edit ? (
						<View style={{marginLeft: 16}}>
							<TextInputComponent
							value={serie}
							onChangeText={setSerie}
							maxLength={2}
							keyboardType='numeric'
						/>
						</View>
					) : <Text style={styles.info_text}>{serie}</Text>
				}

				<View style={styles.info_row}>
					<AntDesign name="calendar" size={12} color="#5E4E90" />
					<Text style={styles.info_label}>Ano</Text>
				</View>
				{
					edit ? (
						<View style={{marginLeft: 16}}>
							<TextInputComponent
							value={ano}
							onChangeText={setAno}
							maxLength={4}
							keyboardType='numeric'
						/>
						</View>
					) : <Text style={styles.info_text}>{ano}</Text>
				}
				
				<View style={styles.info_row}>
					<MaterialIcons name="supervised-user-circle" size={12} color="#5E4E90"  />
					<Text style={styles.info_label}>Professor</Text>
				</View>
				<Text style={styles.info_text}>{professor}</Text>

				{
					edit ? (
							<View style={{marginTop:8}}>
								<ButtonConfirmComponent title="Salvar" onClick={editTurma}/>
							</View>
						
					): ""
				}
				
			</View>

			{
				role === 'professor' ? (
					<View style={styles.info}>
				<Text style={styles.alunos_text}> Alunos </Text>

				<View style={styles.alunos_button_grid}> 
					<TouchableOpacity style={styles.view_button_alunos} onPress={handleListAlunos}>
						<MaterialIcons name="list" size={24} color="#5E4E90" style={styles.view_button_alunos_icon} />
						<Text style={styles.view_button_alunos_text}>Listar Alunos</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.view_button_alunos} onPress={() => setModalAddAluno(true) }>
						<MaterialIcons name="add" size={24} color="#5E4E90" style={styles.view_button_alunos_icon} />
						<Text style={styles.view_button_alunos_text}>Adicionar Aluno</Text>
					</TouchableOpacity>
				</View>		
			</View>
				): ""
			}
			
			{
				role === 'professor' ? (
					<View style={styles.info}>
						<Text style={styles.alunos_text}> Aulas </Text>

						<View style={styles.alunos_button_grid}> 
							<TouchableOpacity style={styles.view_button_alunos} onPress={() => setModalListAulas(true)}>
								<MaterialIcons name="list" size={24} color="#5E4E90" style={styles.view_button_alunos_icon} />
								<Text style={styles.view_button_alunos_text}>Ver Aulas</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.view_button_alunos} onPress={() => setModalAddAula(true) }>
								<MaterialIcons name="add" size={24} color="#5E4E90" style={styles.view_button_alunos_icon} />
								<Text style={styles.view_button_alunos_text}>Adicionar Aula</Text>
							</TouchableOpacity>
						</View>		
					</View>	
				): ""
			}

			</ScrollView>
          <NavBar />
		  <FlashMessage position="top" />
      </View>
     
    );
};