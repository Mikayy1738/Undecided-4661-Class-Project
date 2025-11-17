// src/screens/HomeScreen.js
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useClients } from '../contexts/ClientsContext';

export default function HomeScreen({ navigation }) {
  const { clients } = useClients();

  const handleCreateClient = () => {
    navigation.navigate('CreateClient');
  };

  const handleClientPress = (client) => {
    navigation.navigate('SessionTaskList', { client });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Home Page</Text>
          <Text style={styles.subtitle}>Welcome to the ABA Dashboard!</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreateClient}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.clientsSection}>
        <Text style={styles.sectionTitle}>Current Clients</Text>
        <ScrollView style={styles.clientsList} contentContainerStyle={styles.cardsContainer}>
          {clients.length === 0 ? (
            <Text style={styles.emptyText}>No clients created yet</Text>
          ) : (
            clients.map((client, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handleClientPress(client)}
                activeOpacity={0.7}
              >
                <View style={styles.cardContent}>
                  <View style={styles.profileIcon}>
                    <Text style={styles.profileIconText}>
                      {client.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardText}>{client.name}</Text>
                    <Text style={styles.cardSubtext}>Age: {client.age}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#111827',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 32,
  },
  clientsSection: {
    flex: 1,
    width: '100%',
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  clientsList: {
    flex: 1,
    width: '100%',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileIconText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
  },
  cardInfo: {
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 20,
  },
});