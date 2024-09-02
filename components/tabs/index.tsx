import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IoniconNames = React.ComponentProps<typeof Ionicons>['name'];

interface TabBarIconProps {
  name: IoniconNames;
  color: string;
  focused: boolean;
  onPress?: (e?: any) => void
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, focused , onPress}) => {

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
      <Ionicons name={name} size={24} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default TabBarIcon;
