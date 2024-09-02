import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StockStatus from '@/components/stock-status';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import { InventoryItem } from '@/types';

type InventoryItemCardProps = {
  item: InventoryItem;
};

const ProductCard2: React.FC<InventoryItemCardProps> = ({ item }) => {
  return (
    <View style={[combineStyles(GlobalStyles, 'border_soft_blue', 'border_xs', 'rounded_xs', 'padding_xs', 'jusify_center', 'items_center', 'background_white'), { width: 250 }]}>
      <Image
        source={item.image}
        style={[GlobalStyles.rounded_xs, { width: 220, height: 180 }]}
        resizeMode='contain'
      />
      <View style={combineStyles(GlobalStyles, 'margin_t_sm', 'margin_b_xs')}>
        <Image
          source={require('../../../assets/images/seller/image11.png')}
          style={[{ width: 70, height: 25 }]}
          resizeMode='contain'
        />
        <Text style={combineStyles(GlobalStyles, 'text_lg', 'font_medium', 'line_lg', 'margin_t_xs')}>{item.name}</Text>
        <View style={combineStyles(GlobalStyles, 'flex_row')}>
          <Text style={combineStyles(GlobalStyles, 'text_3xl', 'margin_t_xs', 'margin_b_xs')}>{'$'}</Text>
          <Text style={combineStyles(GlobalStyles, 'text_3xl', 'margin_t_xs', 'margin_b_xs', 'font_bold')}>{item.price}</Text>
        </View>
        <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_royal_blue', 'padding_t_xs', 'padding_b_xs', 'rounded_full', 'items_center', 'padding_x_xs', 'flex_row', 'jusify_center')]}>
            <Image
                source={require('@/assets/images/Group 28_white.png')}
                style={[{ height: 16 }]}
                resizeMode='contain'
            />
            <Text style={combineStyles(GlobalStyles, 'text_lg', 'margin_l_xs', 'margin_r_xs', 'color_white')}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard2;
