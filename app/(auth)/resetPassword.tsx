import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { router } from 'expo-router';
import { useAuth } from '@/context/auth';

type FormValues = {
  new_password: string;
  confirm_password: string;
};

const ResetPasswordScreen: React.FC = () => {
    const {JWTtoken, email} = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      new_password: '',
      confirm_password: '',
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    if (data.new_password !== data.confirm_password) {
      setModalMessage('Passwords do not match');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    setLoading(true);
    setModalVisible(false);
    try {
      const response = await fetch('http://3.94.146.134/auth/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : `bearer ${JWTtoken}`
        },
        body: JSON.stringify({ 
            email: email,
            new_password: data.new_password,
         }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setModalMessage('Password reset successfully!');
        setIsSuccess(true);
        router.push('(tabs)');
      } else {
        setModalMessage(`Password reset failed: ${result.detail || 'Unknown error'}`);
        setIsSuccess(false);
      }
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      setModalMessage('Password reset failed: Network error');
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password</Text>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#C4C4C4" style={styles.icon} />
        <Controller
          control={control}
          name="new_password"
          rules={{ required: 'New password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#C4C4C4"
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#C4C4C4" />
        </TouchableOpacity>
      </View>
      {errors.new_password && <Text style={styles.errorText}>{errors.new_password.message}</Text>}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#C4C4C4" style={styles.icon} />
        <Controller
          control={control}
          name="confirm_password"
          rules={{ required: 'Please confirm your password' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#C4C4C4"
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password.message}</Text>}

      <TouchableOpacity style={styles.resetButton} onPress={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.resetButtonText}>Reset Password</Text>}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon
              name={isSuccess ? "check-circle" : "times-circle"}
              size={50}
              color={isSuccess ? "green" : "red"}
              style={styles.modalIcon}
            />
            <Text>{modalMessage}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
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
    padding: 16,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#C4C4C4',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#333333',
  },
  resetButton: {
    backgroundColor: '#3FB9AA',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3FB9AA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ResetPasswordScreen;
