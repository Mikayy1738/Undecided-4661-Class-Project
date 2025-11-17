import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

export default function SessionTaskListScreen({ route, navigation }) {
  const client = route.params?.client || { name: 'Individual Name' };
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Motor Imitation: Clapping', status: null },
    { id: 2, name: 'Responding to Greetings', status: null },
    { id: 3, name: 'Receptive Instruction', status: null },
  ]);
  const [notes, setNotes] = useState('');

  const handleStatusPress = (taskId, status) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: task.status === status ? null : status };
      }
      return task;
    }));
  };

  const handleSubmit = () => {
    
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Session Task List</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.sessionSection}>
        <Text style={styles.sessionLabel}>Session: {client.name}</Text>
      </View>

      <View style={styles.tasksSection}>
        <Text style={styles.sectionTitle}>Tasks:</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={styles.taskName}>{task.name}</Text>
            <View style={styles.statusButtons}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  task.status === 'pass' && styles.statusButtonActive,
                  task.status === 'pass' && { backgroundColor: '#10b981', borderColor: '#10b981' }
                ]}
                onPress={() => handleStatusPress(task.id, 'pass')}
              >
                <Text style={[
                  styles.statusIcon,
                  task.status === 'pass' && styles.statusIconActive,
                  task.status === 'pass' && { color: '#fff' }
                ]}>✓</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  task.status === 'partial' && styles.statusButtonActive,
                  task.status === 'partial' && { backgroundColor: '#f59e0b', borderColor: '#f59e0b' }
                ]}
                onPress={() => handleStatusPress(task.id, 'partial')}
              >
                <Text style={[
                  styles.statusIcon,
                  task.status === 'partial' && styles.statusIconActive,
                  task.status === 'partial' && { color: '#fff' }
                ]}>○</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  task.status === 'fail' && styles.statusButtonActive,
                  task.status === 'fail' && { backgroundColor: '#ef4444', borderColor: '#ef4444' }
                ]}
                onPress={() => handleStatusPress(task.id, 'fail')}
              >
                <Text style={[
                  styles.statusIcon,
                  task.status === 'fail' && styles.statusIconActive,
                  task.status === 'fail' && { color: '#fff' }
                ]}>✗</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter session notes..."
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
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
  placeholder: {
    width: 40,
  },
  sessionSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
  },
  sessionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  tasksSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  taskName: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginRight: 16,
  },
  statusButtons: {
    flexDirection: 'row',
  },
  statusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 8,
  },
  statusButtonActive: {
    borderColor: '#111827',
  },
  statusIcon: {
    fontSize: 20,
    color: '#9ca3af',
  },
  statusIconActive: {
    fontWeight: 'bold',
  },
  notesSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 8,
  },
  notesInput: {
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
  },
});

