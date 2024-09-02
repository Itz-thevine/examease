import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SupportScreen = () => {
  const router = useRouter();

  const handlePress = (title: string) => {
    router.push({ pathname: '/support/detail', params: { title } });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Get Help</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Issues</Text>
        <TouchableOpacity style={styles.optionItem} onPress={() => handlePress('Forgot Password')}>
          <Text style={styles.optionText}>Forgot Password</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={() => handlePress('Change Email')}>
          <Text style={styles.optionText}>Change Email</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={() => handlePress('Update Profile Information')}>
          <Text style={styles.optionText}>Update Profile Information</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.optionItem} onPress={() => handlePress('Change Language')}>
          <Text style={styles.optionText}>Change Language</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={() => handlePress('Change Theme')}>
          <Text style={styles.optionText}>Change Theme</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.optionItem} onPress={() => handlePress('Contact Support')}>
          <Text style={styles.optionText}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={() => handlePress('FAQ')}>
          <Text style={styles.optionText}>FAQ</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackText}>Does this information solve your issue?</Text>
        <View style={styles.feedbackButtons}>
          <TouchableOpacity style={styles.feedbackButton}>
            <Text style={styles.feedbackButtonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedbackButton}>
            <Text style={styles.feedbackButtonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  feedbackContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 20,
  },
  feedbackButtons: {
    flexDirection: 'row',
  },
  feedbackButton: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SupportScreen;
