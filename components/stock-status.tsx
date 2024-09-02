import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StockStatusProps = {
  stock: number;
  position?: 'before' | 'after';
};

const StockStatus: React.FC<StockStatusProps> = ({ stock, position = 'before' }) => {
  const StockElement = (
    <View style={[combineStyles(GlobalStyles, 'jusify_center', 'items_center', 'border_sm', 'margin_r_xs', 'rounded_full'), { width: 25, height: 25 }, stock === 0 ? styles.outOfStockCircle : styles.inStockCircle]}>
      <Text style={combineStyles(GlobalStyles, 'text_sm', 'font_bold')}>{stock}</Text>
    </View>
  );

  const TextElement = (
    <Text style={combineStyles(GlobalStyles, 'text_sm', 'margin_r_xs')}>{stock === 0 ? 'Closed' : 'In stock'}</Text>
  );

  return (
    <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
      {position === 'before' ? (
        <>
          {StockElement}
          {TextElement}
        </>
      ) : (
        <>
          {TextElement}
          {StockElement}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inStockCircle: {
    borderColor: '#F6A70D',
  },
  outOfStockCircle: {
    borderColor: '#FF0000',
  },
});

export default StockStatus;
