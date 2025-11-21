import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useClients, useTasks } from '../contexts';

export default function ClientScreen({ route, navigation }) {
  const client = route.params?.client || { name: 'Client', DOB: '', idNumber: '', insuranceProvider: '', id: '' };

  const [modalVisible, setModalVisible] = useState(false);
  const { deleteClient } = useClients();
  const { clearClientTasks } = useTasks();

  const handleDeleteClient = async () => {
    setModalVisible(false);

    await deleteClient(client.id);
    clearClientTasks(client.id);

    navigation.replace('Home');
  };

  const handleNavigateToSessionTaskList = () => {
    navigation.navigate('SessionTaskList', { client });
  };

  const handleNavigateToNotes = () => {
    navigation.navigate('Notes', { client });
  };

  const handleNavigateToGroupTracking = () => {
    navigation.navigate('GroupTracking', { client });
  };

  const handleNavigateToReports = () => {
    navigation.navigate('Reports', { client });
  };

  const handleNavigateToGoals = () => {
    navigation.navigate('Goals', { client });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete client **{client.name}**? This action cannot be undone.
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonDelete]}
                onPress={handleDeleteClient}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonDeleteText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Client</Text>
        <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.deleteClientButton}
        >
          <Text style={styles.deleteClientText}>🗑 Delete</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.clientInfoSection}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>
            {client.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.clientName}>{client.name}</Text>
        {client.DOB && <Text style={styles.clientDetail}>DOB: {client.DOB}</Text>}
        {client.idNumber && <Text style={styles.clientDetail}>ID Number: {client.idNumber}</Text>}
        {client.insuranceProvider && <Text style={styles.clientDetail}>Insurance: {client.insuranceProvider}</Text>}
      </View>

      <View style={styles.optionsSection}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleNavigateToSessionTaskList}
          activeOpacity={0.7}
        >
          <Text style={styles.optionCardText}>Session Task List</Text>
          <Text style={styles.optionCardArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleNavigateToNotes}
          activeOpacity={0.7}
        >
          <Text style={styles.optionCardText}>Notes</Text>
          <Text style={styles.optionCardArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleNavigateToGroupTracking}
          activeOpacity={0.7}
        >
          <Text style={styles.optionCardText}>Group Tracking</Text>
          <Text style={styles.optionCardArrow}>→</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleNavigateToReports}
          activeOpacity={0.7}
        >
          <Text style={styles.optionCardText}>Reports</Text>
          <Text style={styles.optionCardArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleNavigateToGoals}
          activeOpacity={0.7}
        >
          <Text style={styles.optionCardText}>Goals</Text>
          <Text style={styles.optionCardArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  deleteClientButton: {
    padding: 8,
  },
  deleteClientText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#e5e7eb',
  },
  modalButtonDelete: {
    backgroundColor: '#ef4444',
  },
  modalButtonText: {
    color: '#111827',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalButtonDeleteText: {
    color: 'white',
  },
  clientInfoSection: {
    backgroundColor: '#fff',
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileIconText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#6b7280',
  },
  clientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  clientDetail: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  optionsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionCardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  optionCardArrow: {
    fontSize: 20,
    color: '#6b7280',
  },
});