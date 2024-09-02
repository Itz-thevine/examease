import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

interface PromoItemProps {
  image: any;
  text: string;
}

const PromoItem: React.FC<PromoItemProps> = ({ image, text }) => {
  return (
    <View style={combineStyles(GlobalStyles, 'items_center', 'padding_sm', 'safeArea')}>
      <Image source={image} style={[{ width: 50, height: 50 }]} resizeMode="contain" />
      <Text style={combineStyles(GlobalStyles, 'text_lg', 'text_center', 'margin_t_sm')}>{text}</Text>
    </View>
  );
};

export default PromoItem;
