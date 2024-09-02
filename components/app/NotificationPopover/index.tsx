import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

type Notification = {
  id: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
};

const notifications: Notification[] = [
  {
    id: '1',
    user: 'Polly',
    action: 'edited Contact page',
    time: '36 mins ago',
    avatar: 'https://example.com/avatar1.png',
  },
  {
    id: '2',
    user: 'James',
    action: 'left a comment on ACME 2.1',
    time: '2 hours ago',
    avatar: 'https://example.com/avatar2.png',
  },
  {
    id: '3',
    user: 'Mary',
    action: 'shared the file Isometric 2.0 with you',
    time: '3 hours ago',
    avatar: 'https://example.com/avatar3.png',
  },
  {
    id: '4',
    user: 'Dima',
    action: 'edited ACME 2.1',
    time: '3 hours ago',
    avatar: 'https://example.com/avatar4.png',
  },
];

const NotificationPopover = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={styles.popoverContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <Image source={{ uri: notification.avatar }} style={styles.avatar} />
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationUser}>{notification.user}</Text>
              <Text style={styles.notificationAction}>{notification.action}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  popoverContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationsList: {
    maxHeight: 300,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  notificationUser: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  notificationAction: {
    fontSize: 14,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificationPopover;
