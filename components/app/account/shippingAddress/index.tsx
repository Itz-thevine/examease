import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Address } from '@/types';

interface ShippingAddressesScreenProps {
  onEdit: (address: Address | null) => void;
  onClose: () => void;
}

const addresses: Address[] = [
  {
    id: '1',
    name: 'Yusuf Kusimo',
    phone: '+234-9025162207',
    addressLine1: 'Abu postal office',
    addressLine2: 'Zaria, Kaduna state, Nigeria, 810107',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Yusuf Kusimo',
    phone: '+234-9025162207',
    addressLine1: 'Abu Hotels',
    addressLine2: 'Sabon Gari, Kaduna state, Nigeria, 802107',
    isDefault: false,
  },
];

const ShippingAddressesScreen: React.FC<ShippingAddressesScreenProps> = ({ onEdit, onClose }) => {
  const renderItem = ({ item }: { item: Address }) => (
    <View style={styles.addressContainer}>
      {item.isDefault && <Text style={styles.defaultLabel}>Default</Text>}
      <View style={styles.addressHeader}>
        <Ionicons name="location-outline" size={24} color="black" />
        <Text style={styles.addressName}>
          {item.name}, {item.phone}
        </Text>
      </View>
      <Text style={styles.addressLine1}>{item.addressLine1}</Text>
      <Text style={styles.addressLine2}>{item.addressLine2}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(item)}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        {!item.isDefault && <Text style={styles.setDefaultText}>Set as default</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping address</Text>
        <TouchableOpacity onPress={() => console.log('More pressed')}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => onEdit(null)}>
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
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
  listContent: {
    paddingBottom: 80,
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  defaultLabel: {
    color: 'red',
    marginBottom: 5,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addressLine1: {
    fontSize: 16,
    marginBottom: 5,
  },
  addressLine2: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editText: {
    color: '#00f',
  },
  setDefaultText: {
    color: '#00f',
  },
  addButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ShippingAddressesScreen;
