import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InventoryItem } from '@/types';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import { router } from 'expo-router';

type ProductSuggestionItemProps = {
    item: InventoryItem;
    selectedProduct: InventoryItem | null;
    onSelect: (item: InventoryItem) => void;
    setIsVisible: (item: boolean) => void;
};

const ProductSuggestionItem: React.FC<ProductSuggestionItemProps> = ({ item, selectedProduct, onSelect, setIsVisible }) => {
    return (
        <TouchableOpacity onPress={() => {
            onSelect(item);
            router.push('/(seller)/add-new-inventory')
            setIsVisible(false)
        }}>
            <View style={[combineStyles(GlobalStyles, 'border_xs', 'padding_xs', 'border_gray', 'flex_row', 'rounded_xs', 'items_center'), { backgroundColor: item.id === selectedProduct?.id ? "#FFF4DE" : '#fff', overflow: 'hidden' }]}>
                <Image
                    source={item.image}
                    style={{ width: '30%', height: 120 }}
                    resizeMode='contain'
                />
                <View style={combineStyles(GlobalStyles, 'padding_x_sm')}>
                    <Text style={[combineStyles(GlobalStyles, 'text_2xl', 'font_medium'), { width: '60%' }]}>{item.name}</Text>
                    <View style={combineStyles(GlobalStyles, 'flex_row', 'margin_t_xs')}>
                        <Text style={[combineStyles(GlobalStyles, 'background_warning', 'color_white', 'padding_x_xs', 'rounded_md'), { paddingVertical: 5 }]}>{'$'}</Text>
                        <Text style={combineStyles(GlobalStyles, 'text_3xl', 'margin_l_xs')}>{item.price}</Text>
                    </View>
                    <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'margin_t_xs')}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={combineStyles(GlobalStyles, 'margin_l_xs')}>{item.brand}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductSuggestionItem;
