import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import React from 'react';
import { View, Image, StyleSheet, Text, ImageSourcePropType } from 'react-native';

interface ManufacturerItemProps {
  brand: string;
  icon : ImageSourcePropType
}

const ManufacturerItem: React.FC<ManufacturerItemProps> = ({ brand, icon }) => {
  return (
    <View style={combineStyles(GlobalStyles, 'items_center')}>
        <Image source={icon} style={styles.manufacturerLogo} />
        <Text>{brand}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  manufacturerLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default ManufacturerItem;
