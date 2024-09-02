import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import { combineStyles } from '@/lib'; // Assuming this is a utility function for combining styles
import { GlobalStyles } from '@/styles'; // Assuming this is your global styles file

interface CartSummaryProps {
  cartItems: any[];
  renderCartItem: ({ item }: { item: any }) => JSX.Element;
  RelatedProducts: any[];
  renderRelatedProduct: ({ item }: { item: any }) => JSX.Element;
  totalAmount: string;
  moveNext: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cartItems,
  renderCartItem,
  RelatedProducts,
  renderRelatedProduct,
  totalAmount,
  moveNext,
}) => {
  return (
    <View style={[combineStyles(GlobalStyles, 'background_softer_blue'),{ flex: 1 }]}>
      <ScrollView>
        {/* Cart Items */}
        <View style={combineStyles(GlobalStyles, 'margin_sm', 'flex_row', 'gap_sm', 'items_center')}>
          <View style={[combineStyles(GlobalStyles, 'background_warning', 'rounded_full', 'jusify_center', 'items_center'), { width: 30, height: 30 }]}>
            <Text style={combineStyles(GlobalStyles, 'color_white', 'font_bold')}>{cartItems.length}</Text>
          </View>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_bold')}>Items</Text>
        </View>
        <FlatList
          data={RelatedProducts}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          style={styles.cartList}
          contentContainerStyle={combineStyles(GlobalStyles, 'gap_sm', 'margin_sm')}
        />

        {/* Related Products */}
        <View style={combineStyles(GlobalStyles, 'margin_sm')}>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'margin_b_sm')}>You Might Also Like</Text>
          <FlatList
            data={RelatedProducts}
            renderItem={renderRelatedProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={combineStyles(GlobalStyles, 'gap_sm')}
          />
        </View>
        <View style={{ width: '100%', height: 200 }}></View>
      </ScrollView>

      <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm')}>
        <View style={[combineStyles(GlobalStyles, 'flex_row', 'margin_t_xs', 'jusify_between', 'safeArea', 'margin_r_xs', 'margin_l_xs', 'margin_b_xs')]}>
          <Text style={combineStyles(GlobalStyles, 'text_2xl')}>Total</Text>
          <View style={combineStyles(GlobalStyles, 'flex_row')}>
            <Text style={combineStyles(GlobalStyles, 'text_3xl', 'margin_t_xs', 'margin_b_xs')}>{'$'}</Text>
            <Text style={combineStyles(GlobalStyles, 'text_3xl', 'margin_t_xs', 'margin_b_xs', 'font_bold')}>{totalAmount}</Text>
          </View>
        </View>

        <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
          <TouchableOpacity
            style={[combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm'), { width: '100%' }]}
            onPress={moveNext}
          >
            <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Proceed Buying</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartList: {
    // Add your styles here if needed
  },
});

export default CartSummary;
