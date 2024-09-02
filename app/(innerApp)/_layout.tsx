import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/context/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="profile/account/index" options={{ headerShown: false }} />
          <Stack.Screen name="profile/change-password/index" options={{ headerShown: false }} />
          <Stack.Screen name="profile/support/index" options={{ headerShown: false }} />
          <Stack.Screen name="profile/support/[details]" options={{ headerShown: false }} />
          <Stack.Screen name="profile/feedback/index" options={{ headerShown: false }} />
          <Stack.Screen name="profile/my-shop/index" options={{ headerShown: false }} />
          <Stack.Screen name="items/index" options={{ headerShown: false }} />
          <Stack.Screen name="product/index" options={{ headerShown: false }} />
          <Stack.Screen name="cart/index" options={{ headerShown: false }} />
          <Stack.Screen name="add-product/index" options={{ headerShown: false }} />
          <Stack.Screen name="company-details/index" options={{ headerShown: false }} />
          <Stack.Screen name="bank-details/index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default RootLayout;
