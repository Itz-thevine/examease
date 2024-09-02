import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { combineStyles, width } from '@/lib'; // Assuming this is a utility function for combining styles
import { GlobalStyles } from '@/styles'; // Assuming this is your global styles file
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArtIcon from 'react-native-vector-icons/AntDesign';
import Counter from '@/components/shared/counter';


interface ConfirmPurchaseProps {
  moveNext: () => void;
}

const ConfirmPurchaseScreen: React.FC<ConfirmPurchaseProps> = ({moveNext}) => {
  const [count , setCount] = useState(0)
  const cartItems = [
    {
      id: '1',
      name: 'QUARTZ INEO FIRST 0W-30',
      quantity: 1,
      price: 25,
      image: require('@/assets/images/seller/image 5.png'), // Replace with your image path
    },
    {
      id: '2',
      name: 'QUARTZ INEO FIRST 0W-30',
      quantity: 1,
      price: 26,
      image: require('@/assets/images/seller/image 5.png'), // Replace with your image path
    },
  ];

  const tax = 10;
  const deliveryFee = 10;
  const total = cartItems.reduce((sum, item) => sum + item.price, 0) + tax + deliveryFee;

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={combineStyles(GlobalStyles, 'flex_row', 'margin_b_sm', 'items_center')}>
      <View style={styles.imageContainer}>
      <Image
        source={item.image}
        style={[GlobalStyles.rounded_xs, {width: 100, height: 100 }]}
        resizeMode='contain'
      />
        {/* <Image src={item.image} style={styles.productImage} alt={item.name} /> */}
      </View>
      <View style={combineStyles(GlobalStyles, 'safeArea', 'margin_l_sm')}>
        <Text style={combineStyles(GlobalStyles, 'font_bold')}>{item.name}</Text>
        <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_t_xs')}>
          5 L - ref. 214178 - Engine oil
        </Text>
        <View style={combineStyles(GlobalStyles, 'flex_row', 'gap_sm', 'margin_t_sm')}>
          <View style={[combineStyles(GlobalStyles), {width : 85}]}>
            <Counter count={count} setCount={setCount} />
          </View>
          <View style={[combineStyles(GlobalStyles, 'margin_r_sm', 'background_softer_blue', 'flex_row', 'items_center' , 'padding_xs', 'rounded_full')]}>
              <ArtIcon name='delete' size={20} color={'#A2112A'} />
          </View>
        </View>
      </View>
      <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
        <Text style={combineStyles(GlobalStyles, 'margin_t_xs', 'text_lg', 'font_bold')}>
          ${item.price}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={combineStyles(GlobalStyles, 'background_soft_blue', 'safeArea')}>
      {/* Cart Items */}
      <ScrollView style={combineStyles(GlobalStyles, 'padding_sm')}>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={combineStyles(GlobalStyles, 'gap_sm', )}
        />

        {/* Tax and Delivery Fee */}
        <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between', 'margin_t_sm')}>
          <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Tax:</Text>
          <Text style={combineStyles(GlobalStyles, 'text_lg')}>${tax}</Text>
        </View>
        <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between', 'margin_t_sm', 'border_b_xs', 'border_soft_gray', 'padding_b_sm')}>
          <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>ExpressUp Delivery:</Text>
          <Text style={combineStyles(GlobalStyles, 'text_lg')}>${deliveryFee}</Text>
        </View>

        {/* Total */}
        <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between', 'margin_t_sm')}>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_bold')}>Total</Text>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_bold')}>${total}</Text>
        </View>

        <View style={combineStyles(GlobalStyles, 'margin_t_sm', 'margin_b_sm')}>
            <Text style={combineStyles(GlobalStyles, 'margin_b_xs', 'text_lg')}>Delivered to</Text>
            <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm', 'rounded_xs')}>
                <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
                    <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
                        
                        <Text style={combineStyles(GlobalStyles, 'text_lg')}>Address Line 1, </Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../assets/images/seller/rect1499.png')}
                            style={[{ width: 20, height: 20 }]}
                            resizeMode='contain'
                        />  
                    </TouchableOpacity>
                    {/* <Icon name="edit" size={20} color="#888" /> */}
                </View>
                <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'color_gray')}>Address Line 2,</Text>
                <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'text_lg')}> Address Line 3.</Text>
            </View>
        </View>
       
        <View style={combineStyles(GlobalStyles, 'margin_t_sm', 'margin_b_sm')}>
            <Text style={combineStyles(GlobalStyles, 'margin_b_xs', 'text_lg')}>Arrives</Text>
            <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm', 'rounded_xs')}>
                <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
                    <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
                        
                        <Text style={combineStyles(GlobalStyles, 'text_lg')}>ExpressUP</Text>
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={require('../../../assets/images/seller/rect1499.png')}
                            style={[{ width: 20, height: 20 }]}
                            resizeMode='contain'
                        />  
                    </TouchableOpacity>
                    {/* <Icon name="edit" size={20} color="#888" /> */}
                </View>
                <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'color_gray')}>Tomorrow</Text>
            </View>
        </View>

        <View style={[combineStyles(GlobalStyles), {width: '100%', height: 50}]}></View>
      </ScrollView>

      {/* Confirm Purchase Button */}
      <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm')}>
        <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm', 'margin_t_xs')} onPress={moveNext}>
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Confirm Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ConfirmPurchaseScreen;
