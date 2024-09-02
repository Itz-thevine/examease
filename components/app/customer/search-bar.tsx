import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

const SearchBar: React.FC = () => {
  return (
    <View style={[combineStyles(GlobalStyles, 'margin_sm', 'flex_row', 'items_center', 'padding_t_xs', 'padding_b_xs', 'padding_x_sm', 'rounded_lg', 'border_sm', 'border_soft_gray'), styles.searchBar]}> 
      <TextInput
        placeholder="Search Part Name or Number"
        style={combineStyles(GlobalStyles, 'color_gray', 'safeArea')}
        placeholderTextColor={'gray'}
      />
      <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#33384C',
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default SearchBar;
