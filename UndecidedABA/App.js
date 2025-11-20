import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CreateClientScreen from './screens/CreateClientScreen';
import ClientScreen from './screens/ClientScreen';
import SessionTaskListScreen from './screens/SessionTaskListScreen';
import NotesScreen from './screens/NotesScreen';
import { ClientsProvider, TasksProvider, AuthProvider } from './contexts';
import GroupTrackingScreen from './screens/GroupTrackingScreen';
import ReportsScreen from './screens/ReportsScreen';
import GoalsScreen from './screens/GoalsScreen';
import { checkIfFirstTimeUser } from './api/firebase';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFirstTime = async () => {
      const firstTime = await checkIfFirstTimeUser();
      setIsFirstTime(firstTime);
      setLoading(false);
    };
    checkFirstTime();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ClientsProvider>
          <TasksProvider>
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName={isFirstTime ? "SignUp" : "Login"} 
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="SignUp" component={SignUpScreen} />
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
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});