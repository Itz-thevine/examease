import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from "@/firebase/app/firebaseConfig";

interface AuthenticationScreenProps {
  navigation: NavigationProp<any>;
}

const AuthenticationScreen: React.FC<AuthenticationScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        const user = userCredential.user;
        Alert.alert('Success', 'Signed in successfully');
        // Navigate to the seller screen after successful sign-in
        router.push('/(seller)/seller');
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };


  

  return (
    <SafeAreaView style={[combineStyles(GlobalStyles, 'margin_t_sm'), styles.container]}>
      <View style={combineStyles(GlobalStyles, 'padding_sm', 'safeArea', 'jusify_center', 'items_center')}>

        <View style={[combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm'), { width: '100%' }]}>
          <TextInput
            style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs', 'color_white')}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'gray'}
            placeholder='Enter email'
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>

        <View style={[combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm'), { width: '100%' }]}>
          <TextInput
            style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs', 'color_white')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor={'gray'}
            placeholder='Enter password'
            autoCapitalize='none'
          />
        </View>

        <View style={[combineStyles(GlobalStyles, 'margin_t_sm'), { width: "100%" }]}>
          <Text style={combineStyles(GlobalStyles, 'color_royal_blue')}>Forgot Password?</Text>
        </View>

        <TouchableOpacity
          style={[combineStyles(GlobalStyles, 'background_royal_blue', 'rounded_full', 'padding_y_sm', 'margin_t_sm', 'padding_x_sm', 'jusify_center', 'items_center'), { width: 200 }]}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.signUpButtonMainText}>Signing In...</Text>
          ) : (
            <Text style={styles.signUpButtonMainText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={combineStyles(GlobalStyles, 'jusify_center', 'items_center', 'margin_t_sm', 'text_center', 'color_white')}>
          <Text style={combineStyles(GlobalStyles, 'color_white')}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={combineStyles(GlobalStyles, 'color_royal_blue', 'margin_t_xs')}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1e30',
  },
  signUpButtonMainText: {
    color: '#fff',
    fontSize: 16,
  },
  orUseText: {
    color: '#ccc',
    fontSize: 16,
    marginVertical: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
});

export default AuthenticationScreen;
