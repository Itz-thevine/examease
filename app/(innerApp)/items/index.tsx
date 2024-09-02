import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ItemDetailScreen = () => {
  const navigation = useNavigation();

  // Static item data
  const item = {
    id: 1,
    title: '300watts Portable Laptop Power Bank',
    price: '₦ 55,000',
    negotiable: 'Negotiable',
    created: '27/04',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'In Stock',
    brand: 'solarvision',
    type: 'Power Bank',
    ports: 2,
    color: 'Black',
    condition: 'Used',
    description: 'I got the laptop power bank last year... for 85k from solarvision, you can check his store out here on jiji seff, I\'m selling because I changed location and I pretty much have stable power.'
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>My ads</Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <Text style={styles.itemPrice}>{item.price} <Text style={styles.itemNegotiable}>{item.negotiable}</Text></Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemCreated}>Created {item.created}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Brand: {item.brand}</Text>
        <Text style={styles.detailText}>Type: {item.type}</Text>
        <Text style={styles.detailText}>Number of Ports: {item.ports}</Text>
        <Text style={styles.detailText}>Color: {item.color}</Text>
        <Text style={styles.detailText}>Condition: {item.condition}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  itemNegotiable: {
    fontSize: 14,
    color: '#888',
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  itemCreated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  publishButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});

export default ItemDetailScreen;
