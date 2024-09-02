import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type Order = {
  id: string;
  name: string;
  items: string;
  date: string;
  image: string;
};

const ongoingOrders: Order[] = [
  { id: '1', name: 'Kichi Coffee & Drink', items: '6 Items', date: 'Yesterday', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Vinamilk Store', items: 'Lemon Juice Fresh', date: 'Jun 09, 2020', image: 'https://via.placeholder.com/150' },
];

const historyOrders: Order[] = [
  { id: '3', name: 'Royal Foods', items: 'Steamed Asparagus', date: 'Jun 03, 2020', image: 'https://via.placeholder.com/150' },
];

const draftOrders: Order[] = [
  // Add your draft orders here
];

const OrderList = ({ orders }: { orders: Order[] }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderItem}>
      <Image source={{ uri: item.image }} style={styles.orderImage} />
      <View style={styles.orderContent}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderItems}>{item.items}</Text>
      </View>
      <Text style={styles.orderDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.orderList}
    />
  );
};

const OngoingOrders = () => <OrderList orders={ongoingOrders} />;
const HistoryOrders = () => <OrderList orders={historyOrders} />;
const DraftOrders = () => <OrderList orders={draftOrders} />;

const Tab = createMaterialTopTabNavigator();

const OrderListScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.pageTitle}>Order</Text>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: 'blue' },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIconStyle: { width: 24, height: 24 },
          tabBarShowIcon: true,
        }}
      >
        <Tab.Screen
          name="Ongoing"
          component={OngoingOrders}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="time-outline" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryOrders}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="albums-outline" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Drafts"
          component={DraftOrders}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-outline" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingLeft: 20,
    backgroundColor: 'white'

  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  orderList: {
    paddingHorizontal: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  orderContent: {
    flex: 1,
    marginLeft: 10,
  },
  orderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItems: {
    color: '#999',
  },
  orderDate: {
    color: '#999',
  },
});

export default OrderListScreen;
