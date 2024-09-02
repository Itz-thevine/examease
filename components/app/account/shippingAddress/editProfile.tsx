import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Address } from '@/types';

interface ShippingAddressFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => void;
  onClose: () => void;
  onSave: () => void;
  onEdit: (address: Address | null) => void;
}


const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ name, setName, handleInputChange, onClose, onSave, onEdit }) => {
  const [isDefaultShipping, setIsDefaultShipping] = useState(false);

  return (
    <View style={styles.modalContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onEdit(null)} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Shipping Address</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Contact information</Text>
        <TextInput style={styles.fieldInput} placeholder="Name" value={name} onChangeText={(value) => handleInputChange(setName, value)} />
        <View style={styles.phoneContainer}>
          <TextInput style={styles.phoneInput} placeholder="+234" keyboardType="phone-pad" />
          <TextInput style={styles.phoneInput} placeholder="9025162207" keyboardType="phone-pad" />
        </View>
      </View>

      <View style={[styles.fieldContainer, styles.addreddFieldContainer]}>
        <Text style={styles.fieldLabel}>Address</Text>
        <TextInput style={styles.fieldInput} placeholder="Street address" />
        <TextInput style={styles.fieldInput} placeholder="Apt, suite, unit, etc (optional)" />
        <TextInput style={styles.fieldInput} placeholder="City" />
        <TextInput style={styles.fieldInput} placeholder="State" />
        <TextInput style={styles.fieldInput} placeholder="ZIP code" keyboardType="numeric" />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Set as default shipping address</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDefaultShipping ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsDefaultShipping((previousState) => !previousState)}
          value={isDefaultShipping}
        />
      </View>

      <TouchableOpacity style={styles.modalSaveButton} onPress={onSave}>
        <Text style={styles.modalSaveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    gap: 8
  },
  phoneInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSaveButton: {
    backgroundColor: '#00f',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalSaveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  addreddFieldContainer: {
    gap: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: "100%"
  },
});

export default ShippingAddressForm;
