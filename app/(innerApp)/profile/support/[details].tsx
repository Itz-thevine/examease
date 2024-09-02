import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const SupportDetailScreen = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams<{ title: string }>();

  const getDetailContent = (title: string) => {
    switch (title) {
      case 'Forgot Password':
        return 'Instructions on how to reset your password...';
      case 'Change Email':
        return 'Instructions on how to change your email...';
      case 'Update Profile Information':
        return 'Instructions on how to update your profile information...';
      case 'Change Language':
        return 'Instructions on how to change the language...';
      case 'Change Theme':
        return 'Instructions on how to change the theme...';
      case 'Contact Support':
        return 'Contact support details...';
      case 'FAQ':
        return 'Frequently asked questions...';
      default:
        return 'Details not available.';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <Text style={styles.content}>{getDetailContent(title ?? '')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});

export default SupportDetailScreen;
