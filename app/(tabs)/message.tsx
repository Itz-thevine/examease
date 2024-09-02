import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread: boolean;
};

const messages: Message[] = [
  { id: '1', name: 'Shane Martinez', message: 'On my way home...', time: '5 min', avatar: 'https://via.placeholder.com/50', unread: true },
  { id: '2', name: 'Katie Keller', message: 'I\'m watching Friends...', time: '15 min', avatar: 'https://via.placeholder.com/50', unread: false },
  // Add more messages here
];

const MessageListScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'read' | 'unread'>('all');

  const filteredMessages = messages.filter((message) => {
    if (selectedTab === 'read') return !message.unread;
    if (selectedTab === 'unread') return message.unread;
    return true;
  });

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.messageMeta}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unread && <View style={styles.unreadBadge} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Messages</Text>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'all' && styles.selectedTab]}
          onPress={() => setSelectedTab('all')}
        >
          <Ionicons name="mail-outline" size={24} color={selectedTab === 'all' ? 'white' : 'black'} />
          <Text style={[styles.tabText, selectedTab === 'all' && styles.selectedTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'read' && styles.selectedTab]}
          onPress={() => setSelectedTab('read')}
        >
          <Ionicons name="checkmark-done-outline" size={24} color={selectedTab === 'read' ? 'white' : 'black'} />
          <Text style={[styles.tabText, selectedTab === 'read' && styles.selectedTabText]}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'unread' && styles.selectedTab]}
          onPress={() => setSelectedTab('unread')}
        >
          <Ionicons name="mail-unread-outline" size={24} color={selectedTab === 'unread' ? 'white' : 'black'} />
          <Text style={[styles.tabText, selectedTab === 'unread' && styles.selectedTabText]}>Unread</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
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
    marginLeft: 20,
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  selectedTabText: {
    color: 'white',
  },
  messageList: {
    paddingHorizontal: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: '#999',
  },
  messageMeta: {
    alignItems: 'flex-end',
  },
  time: {
    color: '#999',
  },
  unreadBadge: {
    width: 10,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    backgroundColor: 'pink',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default MessageListScreen;
