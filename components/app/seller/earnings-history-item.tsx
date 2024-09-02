import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

interface HistoryItemProps {
  order: string;
  date: string;
  amount: number;
  type: 'plus' | 'minus';
}

const HistoryItem: React.FC<HistoryItemProps> = ({ order, date, amount, type }) => {
  const color = type === 'plus' ? '#3EB57C' : '#FF6060';
  const sign = type === 'plus' ? '+' : '-';

  return (
    <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between', 'margin_b_xs', 'items_center')}>
      <Text style={combineStyles(GlobalStyles)}>{order}</Text>
      <View style={combineStyles(GlobalStyles, 'items_end')}>
        <Text style={combineStyles(GlobalStyles, 'color_gray')}>{date}</Text>
        <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
          <Icon style={combineStyles(GlobalStyles, 'margin_r_xs')} name={type} size={20} color={color} />
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_bold')}>
            <Text style={combineStyles(GlobalStyles, 'font_medium')}>$</Text>{amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryItem;