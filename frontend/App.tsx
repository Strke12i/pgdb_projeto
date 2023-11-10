import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/login/login';
import SignUpScreen from './src/screens/login/sigin';
import ProfileAluno from './src/screens/aluno/profileAluno';
import { Home } from './src/screens/home/Home';
import { Turmas } from './src/screens/turma/turmas';
import { Aula } from './src/screens/aula/Aula';
import { Turma } from './src/screens/turma/turma';
import  AddTurma  from './src/screens/turma/addTurma';
import { AuthProvider } from './src/context/AuthContext';
import { useAuth } from './src/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

const Layout = () => {
  const { authState } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          !authState?.authenticated ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignIn" component={SignUpScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Aula" component={Aula} />
              <Stack.Screen name="Turmas" component={Turmas} />
              <Stack.Screen name="Turma" component={Turma} />
              <Stack.Screen name="Perfil" component={ProfileAluno} />
              <Stack.Screen name="AddTurma" component={AddTurma} />
            </>


          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}


