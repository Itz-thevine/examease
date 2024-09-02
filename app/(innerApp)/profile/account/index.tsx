import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Address } from '@/types';
import ShippingAddressesScreen from '@/components/app/account/shippingAddress';
import ShippingAddressForm from '@/components/app/account/shippingAddress/editProfile';

  
const EditProfileScreen = () => {
  const [name, setName] = useState('Standard Boy');
  const [email, setEmail] = useState('yusufkusimo12345@gmail.com');
  const [gender, setGender] = useState('Male');
  const [birthYear, setBirthYear] = useState('1995');
  const [country, setCountry] = useState('Nigeria');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [editingAddress, setEditingAddress] = useState<null | Address>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setIsFormChanged(true);
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setIsFormChanged(true);
  };

  const handleDeleteAccountPress = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') },
    ]);
  };

  const handleSavePress = () => {
    console.log('Profile information saved');
    setIsFormChanged(false);
  };

  const handleShippingAddressSave = () => {
    bottomSheetRef.current?.close();
    setIsFormChanged(true);
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account</Text>
          <TouchableOpacity
            onPress={isFormChanged ? handleSavePress : undefined}
            style={isFormChanged ? styles.saveButton : styles.saveButtonDisabled}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput style={styles.fieldInput} value={name} onChangeText={(value) => handleInputChange(setName, value)} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Account information</Text>
          <TextInput style={styles.fieldInput} value={email} onChangeText={(value) => handleInputChange(setEmail, value)} keyboardType="email-address" />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Gender</Text>
          <TextInput style={styles.fieldInput} value={gender} onChangeText={(value) => handleInputChange(setGender, value)} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Birth Year</Text>
          <TextInput style={styles.fieldInput} value={birthYear} onChangeText={(value) => handleInputChange(setBirthYear, value)} keyboardType="numeric" />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Country/region</Text>
          <TextInput style={styles.fieldInput} value={country} onChangeText={(value) => handleInputChange(setCountry, value)} />
        </View>

        <View style={styles.sectionSeparator} />

        <TouchableOpacity style={styles.optionItem} onPress={() => bottomSheetRef.current?.expand()}>
          <Text style={styles.optionText}>Shipping address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={handleDeleteAccountPress}>
          <Text style={styles.optionText}>Delete account</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '100%']}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        index={-1}
      >
        <BottomSheetView style={styles.contentContainer}>
          {editingAddress === null ? (
            <ShippingAddressesScreen onEdit={setEditingAddress} onClose={() => bottomSheetRef.current?.close()}/>
          ) : (
            <ShippingAddressForm
              name={name}
              setName={setName}
              handleInputChange={handleInputChange}
              onClose={() => bottomSheetRef.current?.close()}
              onSave={handleShippingAddressSave}
              onEdit={setEditingAddress}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#00f',
    padding: 5,
    borderRadius: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#aaa',
    padding: 5,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 5,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  fieldInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  phoneInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginHorizontal: 5,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  optionItem: {
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default EditProfileScreen;
