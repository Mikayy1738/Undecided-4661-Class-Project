import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateClientScreen from './screens/CreateClientScreen';
import SessionTaskListScreen from './screens/SessionTaskListScreen';
import { ClientsProvider } from './contexts/ClientsContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClientsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateClient" component={CreateClientScreen} />
          <Stack.Screen name="SessionTaskList" component={SessionTaskListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClientsProvider>
  );
}