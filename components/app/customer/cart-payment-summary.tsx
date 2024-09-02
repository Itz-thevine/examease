import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { combineStyles } from '@/lib'; // Assuming this is a utility function for combining styles
import { GlobalStyles } from '@/styles'; // Assuming this is your global styles file
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this or another vector icons package

interface CartPaymentMethodProps {
  moveNext: () => void;
}

const PaymentMethod: React.FC<CartPaymentMethodProps> = ({moveNext}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');

  return (
    <View style={combineStyles(GlobalStyles, 'padding_sm', 'background_softer_blue', 'safeArea')}>
      {/* Payment Method Section */}
      <Text style={combineStyles(GlobalStyles, 'text_2xl', 'margin_b_sm')}>Payment Method</Text>
      <TouchableOpacity
        style={selectedPaymentMethod === 'Card' ? styles.selectedOption : styles.option}
        onPress={() => setSelectedPaymentMethod('Card')}
      >
        <View style={styles.optionContent}>
          <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
            <Image
              source={require('@/assets/images/mastercard.png')} // Replace with your card icon path
              style={styles.cardIcon}
            />
            <Text style={combineStyles(GlobalStyles, 'font_bold', 'text_lg', 'margin_l_sm')}>XXXX-9832</Text>
          </View>
        </View>
        {selectedPaymentMethod === 'Card' && <MCIIcon name="check-circle" size={24} color="#007bff" />}
      </TouchableOpacity>
      <TouchableOpacity style={combineStyles(GlobalStyles, 'rounded_full', 'background_soft_blue', 'padding_sm', 'items_center', 'margin_t_sm', 'margin_b_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_lg')}>Add New Address</Text>
        </TouchableOpacity>

      {/* Other Payment Methods */}
      <TouchableOpacity
        style={selectedPaymentMethod === 'Cash on Delivery' ? styles.selectedOption : styles.option}
        onPress={() => setSelectedPaymentMethod('Cash on Delivery')}
      >
        <View style={styles.optionContent}>
          <Text style={combineStyles(GlobalStyles, 'font_bold', 'text_lg')}>Cash on Delivery</Text>
          <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_t_xs')}>Service Description</Text>
        </View>
        {selectedPaymentMethod === 'Cash on Delivery' && <MCIIcon name="check-circle" size={24} color="#007bff" />}
      </TouchableOpacity>
      <TouchableOpacity
        style={selectedPaymentMethod === 'Local Payment Service' ? styles.selectedOption : styles.option}
        onPress={() => setSelectedPaymentMethod('Local Payment Service')}
      >
        <View style={styles.optionContent}>
          <Text style={combineStyles(GlobalStyles, 'font_bold', 'text_lg')}>Local Payment Service</Text>
          <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_t_xs')}>Service Description</Text>
        </View>
        {selectedPaymentMethod === 'Local Payment Service' && <MCIIcon name="check-circle" size={24} color="#007bff" />}
      </TouchableOpacity>

      {/* Total and Next Button Section */}
      <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm')}>
        <View style={[combineStyles(GlobalStyles, 'flex_row', 'jusify_between')]}>
          <Text style={combineStyles(GlobalStyles, 'text_2xl')}>Total</Text>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_bold')}>$51.00</Text>
        </View>
        <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm', 'margin_t_xs')]} onPress={moveNext}>
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 10,
    padding: 25,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  selectedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 10,
    padding: 25,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  optionContent: {
    flex: 1,
  },
  addNewButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  cardIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
});

export default PaymentMethod;
