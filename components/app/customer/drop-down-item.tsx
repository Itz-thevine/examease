import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

interface DropdownItemProps {
  label: string;
  onPress: (value: any) => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={combineStyles(GlobalStyles, 'flex_row', 'safeArea', 'jusify_between', 'padding_xs', 'padding_x_sm', 'border_sm', 'rounded_full', 'margin_b_xs', 'border_soft_blue')}>
      <Text style={styles.dropdownText}>{label}</Text>
      <MaterialIcon name="keyboard-arrow-down" size={24} color="#888" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownText: {
    fontSize: 16,
  },
});

export default DropdownItem;
