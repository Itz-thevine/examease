import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const { login } = useAuth();
  const [isSeller, setIsSeller] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadProfileType = async () => {
      try {
        const storedProfileType = await AsyncStorage.getItem('isSeller');
        if (storedProfileType !== null) {
          setIsSeller(JSON.parse(storedProfileType));
        }
      } catch (error) {
        console.error('Failed to load profile type', error);
      }
    };
    loadProfileType();
  }, []);

  const logout = () => {
    login("");
    router.push('(tabs)/home');
  };

  const handleLogoutPress = () => {
    setModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    setModalVisible(false);
    logout();
  };

  const handleLogoutCancel = () => {
    setModalVisible(false);
  };

  const toggleSwitch = useCallback(async () => {
    const newIsSeller = !isSeller;
    setIsSeller(newIsSeller);
    try {
      await AsyncStorage.setItem('isSeller', JSON.stringify(newIsSeller));
    } catch (error) {
      console.error('Failed to save profile type', error);
    }
  }, [isSeller]);

  return (
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <Text style={styles.pageTitle}>Profile</Text>
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          <Text style={styles.name}>Emma Phillips</Text>
          <Text style={styles.role}>Sales Personnel</Text>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>{isSeller ? 'Seller Profile' : 'Buyer Profile'}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isSeller ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isSeller}
          />
        </View>

        {isSeller && (
          <View style={styles.shop}>
            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} onPress={()=> router.push('/(innerApp)/profile/my-shop')}>
              <Ionicons name="storefront-outline" size={24} color="black" />
              <Text style={styles.sectionItemText}>My Shop</Text>
            </TouchableOpacity>
          </View>
          )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.sectionItem} onPress={()=> router.push('/(innerApp)/profile/account')}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem}  onPress={()=> router.push('/(innerApp)/profile/preference')}>
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Preferences</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <TouchableOpacity style={styles.sectionItem} onPress={()=> router.push('/(innerApp)/profile/support')}>
            <Ionicons name="help-circle-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Support</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.sectionItem} onPress={()=> router.push('/(innerApp)/profile/feedback')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
            <Text style={styles.sectionItemText}>Share feedback</Text>
          </TouchableOpacity>
          
        </View>

        <TouchableOpacity style={styles.logoutContainer} onPress={handleLogoutPress}>
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to log out?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={handleLogoutCancel}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleLogoutConfirm}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 40,
    
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shop : {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default ProfileScreen;
