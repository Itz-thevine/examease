import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';
import { DynamicObject } from '@/types';
import { useRouter } from 'expo-router';

const sellingItems = [
  {
    id: 1,
    title: 'Brake Pads',
    price: '₦ 10,000',
    negotiable: 'Negotiable',
    created: '15/06',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'In Stock'
  },
  {
    id: 2,
    title: 'Engine Oil',
    price: '₦ 5,000',
    negotiable: 'Fixed',
    created: '10/06',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'In Stock'
  }
];

const draftItems = [
  {
    id: 3,
    title: 'Car Battery',
    price: '₦ 25,000',
    negotiable: 'Negotiable',
    created: '01/06',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'Draft saved, ready to publish.'
  },
  {
    id: 4,
    title: 'Headlights',
    price: '₦ 15,000',
    negotiable: 'Fixed',
    created: '25/05',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'Draft saved, ready to publish.'
  }
];

const closedItems = [
  {
    id: 5,
    title: 'Air Filter',
    price: '₦ 8,000',
    negotiable: 'Negotiable',
    created: '10/05',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'Listing closed.'
  },
  {
    id: 6,
    title: 'Spark Plugs',
    price: '₦ 3,500',
    negotiable: 'Fixed',
    created: '20/04',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'Listing closed.'
  }
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState('Drafts');
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null);

  const openMenu = (id: number) => setVisibleMenu(id);
  const closeMenu = () => setVisibleMenu(null);

  const getItems = () => {
    switch (selectedTab) {
      case 'Selling':
        return sellingItems;
      case 'Drafts':
        return draftItems;
      case 'Closed':
        return closedItems;
      default:
        return [];
    }
  };

  const renderItem = (item: DynamicObject) => (
    <View key={item.id} style={styles.itemWrapper}>
      <TouchableOpacity 
        style={styles.itemContainer} 
        onPress={() => router.push('/items/')}
        activeOpacity={1}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemPrice}>{item.price} <Text style={styles.itemNegotiable}>{item.negotiable}</Text></Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemCreated}>Created {item.created}</Text>
          <Text style={styles.itemStatus}>{item.status}</Text>
        </View>
      </TouchableOpacity>
      <TouchableWithoutFeedback>
        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
      <Menu
        visible={visibleMenu === item.id}
        onDismiss={closeMenu}
        style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}
        anchor={
          <TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => openMenu(item.id)} style={styles.menuButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        }
      >
        <Menu.Item onPress={() => { closeMenu(); /* handle edit */ }} title="Edit" />
        <Menu.Item onPress={() => { closeMenu(); /* handle delete */ }} title="Delete" />
      </Menu>
    </View>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>My Shop</Text>
        </View>
        <View style={styles.tabContainer}>
          {['Selling', 'Drafts', 'Closed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={styles.tabButtonText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView style={styles.itemsContainer}>
          {getItems().map((item) => renderItem(item))}
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 40,
    paddingHorizontal: 20
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTabButton: {
    backgroundColor: '#81b0ff',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  itemsContainer: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
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
  },
  itemCreated: {
    fontSize: 14,
    color: '#666',
  },
  itemStatus: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  publishButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  publishButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
