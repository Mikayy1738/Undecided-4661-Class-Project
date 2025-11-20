import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useTasks } from '../contexts';

export default function SessionTaskListScreen({ route, navigation }) {
  const client = route.params?.client || { name: 'Individual Name', id: '' };
  const { getTasks, setTasks } = useTasks();
  const [tasks, setLocalTasks] = useState([]);
  const [notes, setNotes] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [nextTaskId, setNextTaskId] = useState(1);

  useEffect(() => {
    const clientTasks = getTasks(client.id);
    if (clientTasks.length > 0) {
      setLocalTasks(clientTasks);
      const maxId = Math.max(...clientTasks.map(t => t.id), 0);
      setNextTaskId(maxId + 1);
    }
  }, [client.id, getTasks]);

  const saveTasksToContext = (updatedTasks) => {
    setLocalTasks(updatedTasks);
    setTasks(client.id, updatedTasks);
  };

  const handleStatusPress = (taskId, status) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: task.status === status ? null : status };
      }
      return task;
    });
    saveTasksToContext(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
  };

  const handleSaveTask = (taskId) => {
    if (editingTaskName.trim()) {
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, name: editingTaskName.trim() };
        }
        return task;
      });
      saveTasksToContext(updatedTasks);
    }
    setEditingTaskId(null);
    setEditingTaskName('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskName('');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasksToContext(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask = { id: nextTaskId, name: newTaskName.trim(), status: null };
      const updatedTasks = [...tasks, newTask];
      saveTasksToContext(updatedTasks);
      setNextTaskId(nextTaskId + 1);
      setNewTaskName('');
    }
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tasks:</Text>
        </View>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            {editingTaskId === task.id ? (
              <View style={styles.editTaskContainer}>
                <TextInput
                  style={styles.editTaskInput}
                  value={editingTaskName}
                  onChangeText={setEditingTaskName}
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleSaveTask(task.id)}
                >
                  <Text style={styles.saveButtonText}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.cancelButtonText}>✗</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.taskRow}>
                <Text style={styles.taskName}>{task.name}</Text>
                <View style={styles.taskActions}>
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
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditTask(task)}
                  >
                    <Text style={styles.editButtonText}>✎</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteTask(task.id)}
                  >
                    <Text style={styles.deleteButtonText}>🗑</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.addTaskInput}
            value={newTaskName}
            onChangeText={setNewTaskName}
            placeholder="Add new task..."
            onSubmitEditing={handleAddTask}
          />
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={handleAddTask}
          >
            <Text style={styles.addTaskButtonText}>+</Text>
          </TouchableOpacity>
        </View>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  taskItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskName: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginRight: 16,
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editTaskInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  saveButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  editButtonText: {
    fontSize: 16,
    color: '#6b7280',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addTaskInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  addTaskButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  addTaskButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 24,
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

