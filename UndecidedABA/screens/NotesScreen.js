import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useTasks } from '../contexts';

export default function NotesScreen({ route, navigation }) {
  const client = route.params?.client || { name: 'Individual Name', id: '' };
  const { getTasks } = useTasks();
  const [tasks, setTasks] = useState([]);
  const [taskNotes, setTaskNotes] = useState({});

  useEffect(() => {
    const clientTasks = getTasks(client.id);
    setTasks(clientTasks);
  }, [client.id, getTasks]);

  const handleNoteChange = (taskId, note) => {
    setTaskNotes(prev => ({
      ...prev,
      [taskId]: note
    }));
  };

  const handleSave = () => {
    
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notes</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.clientSection}>
        <Text style={styles.clientLabel}>Client: {client.name}</Text>
      </View>

      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>Task Notes</Text>
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks created yet. Create tasks in the Session Task List first.</Text>
          </View>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskNoteContainer}>
              <Text style={styles.taskName}>{task.name}</Text>
              <TextInput
                style={styles.noteInput}
                multiline
                numberOfLines={4}
                placeholder={`Enter notes for ${task.name}...`}
                value={taskNotes[task.id] || ''}
                onChangeText={(text) => handleNoteChange(task.id, text)}
              />
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Notes</Text>
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
  clientSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
  },
  clientLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  notesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  taskNoteContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  noteInput: {
    fontSize: 16,
    color: '#111827',
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

