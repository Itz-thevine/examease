import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';

const TabBarButton: React.FC<BottomTabBarButtonProps & { name: string, label?: string }> = ({ onPress, name, accessibilityState, label }) => {
  const focused = accessibilityState?.selected;
  const color = focused ? Colors.light.tint : '#ccc';

  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Ionicons name={name as any} size={24} color={color} />
      <Text style={{ color }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default TabBarButton;
