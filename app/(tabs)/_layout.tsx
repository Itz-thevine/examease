import { Tabs, router } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/auth';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabBarButton: React.FC<BottomTabBarButtonProps & { name: string, label?: string }> = ({ onPress, name, accessibilityState, label }) => {
  const focused = accessibilityState?.selected;
  const color = focused ? Colors.light.tint : '#ccc'; // Update color based on focus state

  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Ionicons name={name as any} size={24} color={color} />
      <Text style={{color: color}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  const handlePress = (screen: string) => {
    // if (false) {
    if (!user?.access_token) {
      router.push("(auth)/signin");
    } else {
      router.push(screen);
    }
  };

  const getUserMode = async () => {
    try {
      const userMode = await AsyncStorage.getItem('isSeller');
      if (userMode !== null) {
        console.log('seller', JSON.parse(userMode));
      } else {
        console.log('User mode is null');
      }
    } catch (error) {
      console.error('Failed to get user mode', error);
    }
  };
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarButton: (props) => (
            <TabBarButton {...props} onPress={() => router.push("/(tabs)/home")} name={'home'}  label='Home'/>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarButton: (props) => (
            <TabBarButton {...props} onPress={() => router.push("explore")} name={'search'}  label='Explore'/>
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Messages',
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              onPress={() => handlePress("message")}
              name={'chatbubbles'}
              label='Messages'
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              onPress={() => handlePress("orders")}
              name={'list'}
              label='Orders'
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarButton: (props) => (
            <TabBarButton
              {...props}
              onPress={() => handlePress("profile")}
              name={'person'}
              label='Profile'
            />
          ),
        }}
      />
       <Tabs.Screen
        name="explore_old"
        options={{
          title: 'explore_old',
          tabBarButton: () => null, // Hides the tab for this screen
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
