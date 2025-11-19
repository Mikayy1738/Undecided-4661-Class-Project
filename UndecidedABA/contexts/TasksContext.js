import { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [clientTasks, setClientTasks] = useState({});

  const getTasks = (clientId) => {
    return clientTasks[clientId] || [];
  };

  const setTasks = (clientId, tasks) => {
    setClientTasks(prev => ({
      ...prev,
      [clientId]: tasks
    }));
  };

  const addTask = (clientId, task) => {
    setClientTasks(prev => ({
      ...prev,
      [clientId]: [...(prev[clientId] || []), task]
    }));
  };

  const updateTask = (clientId, taskId, updates) => {
    setClientTasks(prev => ({
      ...prev,
      [clientId]: (prev[clientId] || []).map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
  };

  const deleteTask = (clientId, taskId) => {
    setClientTasks(prev => ({
      ...prev,
      [clientId]: (prev[clientId] || []).filter(task => task.id !== taskId)
    }));
  };

  return (
    <TasksContext.Provider value={{
      getTasks,
      setTasks,
      addTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
}

