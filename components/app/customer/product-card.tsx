import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StockStatus from '@/components/stock-status';
import { combineStyles, width } from '@/lib';
import { GlobalStyles } from '@/styles';
import { InventoryItem, productsItem } from '@/types';
import Counter from '@/components/shared/counter';
import { router } from 'expo-router';

type productCard = {
  item: productsItem;
};

const ProductCard: React.FC<productCard> = ({ item }) => {
    const [count, setCount] = useState(0)
  return (
    <TouchableOpacity onPress={() => router.push('/(customer)/product-details')} style={[combineStyles(GlobalStyles, 'border_soft_blue', 'background_white', 'border_xs', 'rounded_xs', 'padding_xs', 'jusify_center', 'safeArea')]}>
        <View style={[combineStyles(GlobalStyles, 'flex_row', 'items_center')]}>
            <View >
                <Image
                    source={item.image}
                    style={[GlobalStyles.rounded_xs, { width: width*0.3, height: 120 }]}
                    resizeMode='contain'
                />
            </View>
            <View style={[combineStyles(GlobalStyles, 'margin_l_xs')]}>
                <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
                    <Image
                    source={require('../../../assets/images/seller/image 6.png')}
                    // source={{ uri: 'https://via.placeholder.com/50' }}
                    style={[{ width: 50, height: 30 }]}
                    resizeMode='cover'
                    />
                    <Text style={combineStyles(GlobalStyles, 'margin_l_xs', 'font_medium')}>{'Total Energies'}</Text>
                </View>

                <Text style={[combineStyles(GlobalStyles, 'text_2xl', 'font_medium', 'line_lg', 'margin_t_xs'), {width: width*0.5}]}>{item.name}</Text>
                <Text style={combineStyles(GlobalStyles, 'text_lg', 'font_medium', 'line_lg', 'margin_t_xs', 'color_gray')}>{'Delivery: Sat 1 May'}</Text>
            </View>
        </View>
        <View style={[combineStyles(GlobalStyles, 'background_soft_blue', 'margin_t_sm'), {width: '100%', height: 1}]}></View>
        <View style={[combineStyles(GlobalStyles, 'flex_row', 'margin_t_xs', 'jusify_between', 'safeArea', 'margin_r_xs', 'margin_l_xs')]}>
            <View style={combineStyles(GlobalStyles, 'flex_row')}>
                <Text style={combineStyles(GlobalStyles, 'text_3xl', 'margin_t_xs', 'margin_b_xs')}>{'$'}</Text>
                <Text style={combineStyles(GlobalStyles, 'text_3xl', 'margin_t_xs', 'margin_b_xs', 'font_bold')}>{item.price}</Text>
            </View>
            <View style={[combineStyles(GlobalStyles, 'flex_row', 'items_center' )]}>
                <View style={[combineStyles(GlobalStyles, 'margin_r_sm')]}>
                    <Counter count={count} setCount={setCount}/>
                </View>
                <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'padding_t_xs', 'padding_b_xs', 'rounded_full', 'items_center', 'padding_x_xs', 'flex_row')}>
                    <Image
                        source={require('@/assets/images/Group 28_white.png')}
                        style={[{ height: 16 }]}
                        resizeMode='contain'
                    />
                    <Text style={combineStyles(GlobalStyles, 'color_white', 'text_lg', 'margin_l_xs')}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
