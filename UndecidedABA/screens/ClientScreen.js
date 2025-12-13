import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ClientScreen({ route, navigation }) {
  const client = route.params?.client || { name: 'Client', DOB: '', idNumber: '', insuranceProvider: '' };

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Client</Text>
        <View style={styles.placeholder} />
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
    backgroundColor: 'rgba(255, 151, 151, 1)',
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
  placeholder: {
    width: 40,
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

