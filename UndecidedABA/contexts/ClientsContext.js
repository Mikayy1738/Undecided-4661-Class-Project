import { createContext, useContext, useState } from 'react';

const ClientsContext = createContext();

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState([]);

  const addClient = (client) => {
    setClients((prevClients) => [...prevClients, client]);
  };

  return (
    <ClientsContext.Provider value={{ clients, addClient }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error('useClients must be used within ClientsProvider');
  }
  return context;
}

