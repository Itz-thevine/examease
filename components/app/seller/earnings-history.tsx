import React from 'react';
import { View, Text } from 'react-native';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import HistoryItem from './earnings-history-item';

const History: React.FC = () => {
  return (
    <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
      <Text style={combineStyles(GlobalStyles, 'text_lg', 'margin_b_xs', 'font_medium')}>History</Text>
      <HistoryItem order="Order #23025" date="Mar 04" amount={351} type="plus" />
      <HistoryItem order="Order #23025" date="Mar 03" amount={196} type="plus" />
      <HistoryItem order="Bank Withdrawal ****- 7856" date="Mar 01" amount={2780} type="minus" />
      <HistoryItem order="Order #23025" date="Apr 27" amount={233} type="plus" />
      <HistoryItem order="Order #23025" date="Apr 25" amount={187} type="plus" />
    </View>
  );
};

export default History;
