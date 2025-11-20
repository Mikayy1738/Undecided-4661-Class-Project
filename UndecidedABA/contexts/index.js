import { createContext, useContext, useState, useEffect } from 'react';
import { saveClients, loadClients } from '../api/firebase';

function createContextProvider(name, providerFactory) {
  const Context = createContext(undefined);

  function Provider(props) {
    const value = providerFactory(props);
    return (
      <Context.Provider value={value}>
        {props.children}
      </Context.Provider>
    );
  }

  function useHook() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(`use${name} must be used within ${name}Provider`);
    }
    return context;
  }

  Provider.displayName = `${name}Provider`;

  return {
    Provider,
    Context,
    [`use${name}`]: useHook
  };
}

const AuthContextData = createContextProvider('Auth', () => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return { currentUser, login, logout };
});

export const AuthProvider = AuthContextData.Provider;
export const useAuth = AuthContextData.useAuth;

const ClientsContextData = createContextProvider('Clients', (props) => {
  const [clients, setClients] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.email) {
      loadClients(currentUser.email).then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setClients(result.data);
        }
      });
    } else {
      setClients([]);
    }
  }, [currentUser]);

  const addClient = async (client) => {
    const newClients = [...clients, client];
    setClients(newClients);
    
    if (currentUser?.email) {
      await saveClients(currentUser.email, newClients);
    }
  };

  return { clients, addClient };
});

export const ClientsProvider = ClientsContextData.Provider;
export const useClients = ClientsContextData.useClients;

const TasksContextData = createContextProvider('Tasks', () => {
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

  return {
    getTasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask
  };
});

export const TasksProvider = TasksContextData.Provider;
export const useTasks = TasksContextData.useTasks;

