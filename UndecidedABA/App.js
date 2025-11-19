import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateClientScreen from './screens/CreateClientScreen';
import ClientScreen from './screens/ClientScreen';
import SessionTaskListScreen from './screens/SessionTaskListScreen';
import NotesScreen from './screens/NotesScreen';
import { ClientsProvider } from './contexts/ClientsContext';
import { TasksProvider } from './contexts/TasksContext';
import GroupTrackingScreen from './screens/GroupTrackingScreen';
import ReportsScreen from './screens/ReportsScreen';
import GoalsScreen from './screens/GoalsScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClientsProvider>
      <TasksProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateClient" component={CreateClientScreen} />
            <Stack.Screen name="Client" component={ClientScreen} />
            <Stack.Screen name="SessionTaskList" component={SessionTaskListScreen} />
            <Stack.Screen name="Notes" component={NotesScreen} />
            <Stack.Screen name="GroupTracking" component={GroupTrackingScreen} />
            <Stack.Screen name="Reports" component={ReportsScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TasksProvider>
    </ClientsProvider>
  );
}