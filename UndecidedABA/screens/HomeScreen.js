// src/screens/HomeScreen.js
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useClients, useAuth } from '../contexts';

export default function HomeScreen({ navigation }) {
  const { clients } = useClients();
  const { currentUser, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const getUserName = () => {
    if (!currentUser?.email) return 'User';
    const emailName = currentUser.email.split('@')[0];
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  };

  const getUserInitial = () => {
    if (!currentUser?.email) return 'U';
    return currentUser.email.charAt(0).toUpperCase();
  };

  const handleCreateClient = () => {
    navigation.navigate('CreateClient');
  };

  const handleClientPress = (client) => {
    navigation.navigate('Client', { client });
  };

  const handleSignOut = () => {
    setDropdownVisible(false);
    logout();
    navigation.replace('Login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileButtonContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={toggleDropdown}>
              <View style={styles.profileIconSmall}>
                <Text style={styles.profileIconText}>{getUserInitial()}</Text>
              </View>
            </TouchableOpacity>
            {dropdownVisible && (
              <Modal
                transparent={true}
                visible={dropdownVisible}
                animationType="fade"
                onRequestClose={closeDropdown}
              >
                <TouchableWithoutFeedback onPress={closeDropdown}>
                  <View style={styles.dropdownOverlay}>
                    <TouchableWithoutFeedback>
                      <View style={[styles.dropdownMenu, styles.shadowMedium]}>
                        <View style={styles.dropdownHeader}>
                          <View style={[styles.profileIconSmall, { marginRight: 12 }]}>
                            <Text style={styles.profileIconText}>{getUserInitial()}</Text>
                          </View>
                          <View style={styles.dropdownUserInfo}>
                            <Text style={styles.dropdownUserName}>{getUserName()}</Text>
                            <Text style={styles.dropdownUserEmail}>{currentUser?.email}</Text>
                          </View>
                        </View>
                        <View style={styles.dropdownDivider} />
                        <TouchableOpacity style={styles.dropdownItem} onPress={handleSignOut}>
                          <Text style={styles.dropdownItemText}>Sign Out</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            )}
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}> ABA Dashboard</Text>
            <Text style={styles.subtitle}>Welcome, {getUserName()}</Text>
          </View>
        </View>
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
                style={[styles.card, styles.shadowSmall]}
                onPress={() => handleClientPress(client)}
                activeOpacity={0.7}
              >
                  <View style={styles.cardContent}>
                  <View style={styles.profileIconLarge}>
                    <Text style={styles.profileIconTextGray}>
                      {client.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardText}>{client.name}</Text>
                    {client.DOB && <Text style={styles.cardSubtext}>DOB: {client.DOB}</Text>}
                    {client.idNumber && <Text style={styles.cardSubtext}>ID: {client.idNumber}</Text>}
                    {client.insuranceProvider && <Text style={styles.cardSubtext}>Insurance: {client.insuranceProvider}</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
      
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={[styles.addButton, styles.shadowMedium]} onPress={handleCreateClient}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  profileButtonContainer: {
    position: 'relative',
  },
  profileButton: {
    marginTop: 4,
  },
  profileIconSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingLeft: 20,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 200,
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  dropdownUserInfo: {
    flex: 1,
  },
  dropdownUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  dropdownUserEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dropdownItem: {
    padding: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    alignSelf: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  shadowMedium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  shadowSmall: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addButton: {
    backgroundColor: '#111827',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
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
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIconLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileIconTextGray: {
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