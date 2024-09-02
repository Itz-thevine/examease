import React from 'react';
import { View, Text } from 'react-native';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

const Balance: React.FC = () => {
  return (
    <View style={combineStyles(GlobalStyles, 'margin_b_sm')}>
      <Text style={combineStyles(GlobalStyles, 'text_lg', 'font_medium')}>Balance</Text>
      <Text style={combineStyles(GlobalStyles, 'text_4xl', 'margin_t_xs', 'font_bold')}>
        <Text style={combineStyles(GlobalStyles, 'font_medium')}>$</Text>8,251.00
      </Text>
    </View>
  );
};

export default Balance;
