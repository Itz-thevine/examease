import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StockStatus from '@/components/stock-status';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import { InventoryItem } from '@/types';

type InventoryItemCardProps = {
  item: InventoryItem;
};

const TopSellerItemCard: React.FC<InventoryItemCardProps> = ({ item }) => {
  return (
    <View style={[combineStyles(GlobalStyles, 'border_soft_blue', 'border_xs', 'rounded_xs', 'padding_xs', 'jusify_center', 'items_center', 'background_white'), { width: 250 }]}>
      <View style={[combineStyles(GlobalStyles, 'jusify_start', 'safeArea', 'margin_t_xs', 'margin_b_sm'), { width: 220 }]}>
        <StockStatus stock={item.stock} />
      </View>
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
        <View>
          <TouchableOpacity style={combineStyles(GlobalStyles, 'background_warning', 'padding_t_xs', 'padding_b_xs', 'rounded_full', 'items_center')}>
            <Text style={combineStyles(GlobalStyles, 'color_white', 'text_lg')}>Add New Stock</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TopSellerItemCard;
