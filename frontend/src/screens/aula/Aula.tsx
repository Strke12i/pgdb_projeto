import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {styles} from './styles';
import { BarChart } from 'react-native-chart-kit';
import { NavigationBarComponent } from '../../components/NavigationBarComponent';
import { NavBar } from '../../components/NavBar';
import FlashMessage from 'react-native-flash-message';
import {useState, useEffect} from 'react';
import {baseUrl} from '../../utils/consts';
import axios from 'axios';
import { DangerMessage } from '../../utils/Messages';


interface AulaInfo{
    codigoTurma: number;
    conteudo: string;
    data: Date;
}

interface Avaliacoes{
    [key: string]: [];
}

export const Aula = (props: any) => {
    const idAula = props.route.params.codigoAula;
    const emojis =  ['😍', '😡', '😤', '😴', '😵', '🤓'];
    const [notas, setNotas] = useState<number[]>([]);
    const [aula, setAula] = useState<AulaInfo>({} as AulaInfo);
    const [avaliacoes, setAvaliacoes] = useState<Avaliacoes>({});

    useEffect(() => {
        const getAvaliacoes = async () => {    
            try {
                let n: number[] = [];
                let a: Avaliacoes = {};

                const response = await axios.get(`${baseUrl}/avaliacoes/avaliacoes/${idAula}`);
                for (let item in response.data.filter_avaliacoes) {
                    n.push(response.data.filter_avaliacoes[item].count);
                    a[item] = response.data.filter_avaliacoes[item].descricoes;
                }
                setNotas(n);
                setAvaliacoes(a);
            } catch (error) {
                DangerMessage('Erro ao buscar avaliações');
            }
                 
        }
        const getAula = async () => {
            try {
                const response = await axios.get(`${baseUrl}/aulas/${idAula}`);                
                setAula(response.data.aula);
            } catch (error) {
                DangerMessage('Erro ao buscar aula');
            }
        }
        getAvaliacoes();                
        getAula();                

    }, []);

    
    const chartConfig={
        backgroundColor: "#F4EBFF",
        backgroundGradientFrom: "#5E4E90",
        backgroundGradientTo: "#5E4E90",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        },
      }

    return (
        <SafeAreaView style={styles.container}>
            <NavigationBarComponent />
            <Text style={styles.title}>Minha Aula</Text>
            <View style={styles.grid_scrollview}>
                <ScrollView>
                <BarChart
                    data={{
                        labels: ['😍', '😡', '😤', '😴', '😵', '🤓'],
                        datasets: [
                            {
                                data: notas as number[],
                            },
                        ],
                    }}
                    chartConfig={chartConfig}
                    height={300}
                    width={360}
                    yAxisSuffix=''
                    yAxisLabel={"Qtd: "}
                    style={{borderRadius:20, padding:10}}
                />

                <View style={styles.grid_center}>
                    <View style={styles.grid_information}>
                        <View style={styles.grid_center}>
                         <Text style={styles.title}>Avaliações</Text>
                        </View>
                        
                        <View style={styles.grid_text}>
                            <Text style={styles.text_label}>Contéudo: </Text>
                            <Text style={styles.text_information}>{aula.conteudo}</Text>
                        </View>

                        <View style={styles.grid_text}>
                            <Text style={styles.text_label}>Data: </Text>
                            <Text style={styles.text_information}>{
                                aula.data ? new Date(aula.data).toLocaleDateString() : ''
                            }</Text>
                        </View>

                        <View style={styles.grid_text}>
                            <Text style={styles.text_label}>Total de avaliações: </Text>
                            <Text style={styles.text_information}>
                                {
                                notas.reduce(
                                    (acc, cur) => {
                                        return acc + cur;
                                    }, 0
                                )
                            } 
                            </Text>
                        </View>
                        
                        {
                            Object.keys(avaliacoes).map((item, index) => {
                                return(
                                    avaliacoes[item].length > 0 ? (
                                    <View key={item+index} style={styles.grid_avaliacao}>
                                        {
                                            avaliacoes[item].map((avaliacao: any, i: number) => {
                                                return(
                                                    <View style={styles.avaliacao_text_grid} key={avaliacao+i}>
                                                        <Text style={styles.avaliacao_text}>{emojis[index]}: </Text>
                                                        <Text style={styles.avaliacao_text}>{avaliacao}</Text>
                                                    </View>
                                                    
                                                )
                                            }
                                            )
                                        }

                                    </View>) : ""
                                )
                            })
                        }
                    </View>
                </View>  

              
                </ScrollView>
            </View>

            <NavBar/>
            <FlashMessage position="top" />
        </SafeAreaView>
    );
}
