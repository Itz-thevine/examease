import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth';
import { Ionicons } from '@expo/vector-icons';
import { width, height } from '@/lib';

type FormValues = {
  otp: string;
};

const OTPVerificationScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      otp: '',
    }
  });

  const { email, SetJWTtoken } = useAuth();

  console.log('email', email)
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60); // 60 seconds countdown
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [verifyErrorModalMessage, setVerifyErrorModalMessage] = useState('');

  const otpRef = useRef<TextInput[]>([]);
  const otpValues = watch('otp').split('');

  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    setLoading(true);
    setModalVisible(false);

    try {
      const param = {
        email: email,
        otp_type: 'email_verification',
        otp_code: data.otp
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/verify_otp`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        setModalMessage('OTP verified successfully!');
        setIsSuccess(true);
        SetJWTtoken(result.access_token.access_token);
        router.push('(tabs)/home');
      } else {
        setModalMessage(`OTP verification failed: ${result.detail || 'Unknown error'}`);
        setIsSuccess(false);
      }
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      setModalMessage('OTP verification failed: Network error');
      setIsSuccess(false);
      setModalVisible(true);
    }
  };

  const handleResendOTP = async () => {
    setIsVerifyLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          otp_type: 'email_verification',
        }),
      });

      const otpResult = await response.json();
      setIsVerifyLoading(false);

      if (otpResult.message) {
        setCountdown(60); // Reset the countdown timer
      } else {
        setVerifyErrorModalMessage(otpResult.detail || 'Unknown error');
      }
    } catch (error) {
      setVerifyErrorModalMessage(`OTP resend failed: ${error || 'Unknown error'}`);
      setIsVerifyLoading(false);
    }
  };

  const handleOTPChange = (value: string, index: number) => {
    const newOTP = otpValues.slice();
    newOTP[index] = value;
    setValue('otp', newOTP.join(''));

    if (value && index < 5) {
      otpRef.current[index + 1].focus();
    }

    if (index === 5 && value) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1D6AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify OTP</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Please enter code</Text>
        <Text style={styles.subtitle}>A verification code has been sent to your email</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.otpContainer}>
          {Array(6).fill(0).map((_, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="numeric"
              ref={(el) => (otpRef.current[index] = el!)}
              onChangeText={(value) => handleOTPChange(value, index)}
              value={otpValues[index] || ''}
            />
          ))}
        </View>
        {errors.otp && <Text style={styles.errorText}>{errors.otp.message}</Text>}

        <Text style={styles.countdown}>
          {countdown > 0 ? `Don't receive code? Resend (${countdown}s)` : 'You can resend the OTP now.'}
        </Text>

        {isVerifyLoading ? <ActivityIndicator /> : (
          <TouchableOpacity onPress={handleResendOTP} disabled={countdown > 0}>
            <Text style={[styles.resendText, countdown > 0 && styles.resendTextDisabled]}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.verifyButton, otpValues.join('').length < 6 && styles.verifyButtonDisabled]} onPress={handleSubmit(onSubmit)} disabled={otpValues.join('').length < 6 || loading}>
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.verifyButtonText}>Verify</Text>}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons
              name={isSuccess ? "checkmark-circle" : "close-circle"}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30
  },
  headerTitle: {
    fontSize: 16,
    color: '#1D6AFF',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#C4C4C4',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 12,
  },
  email: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 0,
    borderColor: '#C4C4C4',
    borderRadius: 8,
    textAlign: 'center',
    marginRight: 8,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  countdown: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  resendText: {
    fontSize: 16,
    color: '#1D6AFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  resendTextDisabled: {
    color: '#C4C4C4',
  },
  footer: {
    marginBottom: 30,
  },
  verifyButton: {
    backgroundColor: '#1D6AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButtonDisabled: {
    backgroundColor: '#C4C4C4',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#1D6AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default OTPVerificationScreen;
