import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FeedbackFormScreen = () => {
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitFeedback = () => {
    // Implement feedback submission logic here
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Give feedback</Text>
      </View>

      <Text style={styles.label}>Email address (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Rate your experience</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => handleRatingSelect(num)}
            style={rating === num ? styles.selectedRating : styles.rating}
          >
            <Text style={styles.ratingText}>{['😠', '😞', '😐', '😊', '😁'][num - 1]}</Text>
            <Text style={styles.ratingLabel}>{['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'][num - 1]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Comment, if any?</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Say something here..."
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
        <Text style={styles.submitButtonText}>PUBLISH FEEDBACK</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.thankYouTitle}>Thank you!</Text>
            <Text style={styles.thankYouMessage}>
              By making your voice heard, you help us improve the app.
            </Text>
            <TouchableOpacity onPress={handleModalClose}>
              <Text style={styles.goBackButtonText}>GO BACK HOME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rating: {
    alignItems: 'center',
    flex: 1,
  },
  selectedRating: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  ratingText: {
    fontSize: 30,
  },
  ratingLabel: {
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  thankYouMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  goBackButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default FeedbackFormScreen;
