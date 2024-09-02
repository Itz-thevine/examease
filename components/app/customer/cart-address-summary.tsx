import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { combineStyles } from '@/lib'; // Assuming this is a utility function for combining styles
import { GlobalStyles } from '@/styles'; // Assuming this is your global styles file
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this or another vector icons package


interface CartAddressSummaryProps {
    moveNext: () => void;
  }

  
const CartAddressSummary: React.FC<CartAddressSummaryProps> = ({moveNext}) => {
  const [selectedAddress, setSelectedAddress] = useState('Fann Hock, Dakar');
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('Standard');

  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'safeArea')}>
        <ScrollView style={combineStyles(GlobalStyles, 'padding_sm', 'background_softer_blue', 'safeArea')}>
        {/* Address Section */}
        <Text style={combineStyles(GlobalStyles, 'text_2xl', 'margin_b_sm')}>Address</Text>
        <TouchableOpacity 
            style={selectedAddress === 'Fann Hock, Dakar' ? styles.selectedOption : styles.option} 
            onPress={() => setSelectedAddress('Fann Hock, Dakar')}
        >
            <View style={styles.optionContent}>
            <Text style={combineStyles(GlobalStyles, 'font_bold', 'text_lg')}>Fann Hock, Dakar</Text>
            <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_t_xs')}>
                Address Line 1, Address Line 2, Address Line 3.
            </Text>
            </View>
            {selectedAddress === 'Fann Hock, Dakar' && <MCIIcon name="check-circle" size={24} color="#007bff" />}
        </TouchableOpacity>
        <TouchableOpacity style={combineStyles(GlobalStyles, 'rounded_full', 'background_soft_blue', 'padding_sm', 'items_center', 'margin_t_xs')}>
            <Text style={combineStyles(GlobalStyles, 'text_lg')}>Add New Address</Text>
        </TouchableOpacity>

        {/* Delivery Options Section */}
        <Text style={combineStyles(GlobalStyles, 'text_2xl', 'margin_t_sm', 'margin_b_sm')}>Delivery Options</Text>
        <TouchableOpacity 
            style={selectedDeliveryOption === 'Standard' ? styles.selectedOption : styles.option} 
            onPress={() => setSelectedDeliveryOption('Standard')}
        >
            <View style={styles.optionContent}>
            <Text style={combineStyles(GlobalStyles, 'font_bold', 'text_lg')}>Standard</Text>
            <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_t_xs')}>Wed, Jun 10</Text>
            </View>
            {selectedDeliveryOption === 'Standard' && <MCIIcon name="check-circle" size={24} color="#007bff" />}
        </TouchableOpacity>
        <TouchableOpacity 
            style={selectedDeliveryOption === 'ExpressUP' ? styles.selectedOption : styles.option} 
            onPress={() => setSelectedDeliveryOption('ExpressUP')}
        >
            <View style={styles.optionContent}>
            <View>
                <Text style={combineStyles(GlobalStyles, 'font_bold', 'text_lg')}>ExpressUP</Text>
                <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_t_xs')}>Tomorrow</Text>
            </View>
            <Text style={combineStyles(GlobalStyles, 'text_lg', 'font_bold')}>$11</Text>
            </View>
            {selectedDeliveryOption === 'ExpressUP' && <MCIIcon name="check-circle" size={24} color="#007bff" />}
        </TouchableOpacity>

        {/* Total and Next Button Section */}
        <View style={{width : '100%', height: 200}}></View>
        </ScrollView>
        <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm')}>
        <View style={[combineStyles(GlobalStyles, 'flex_row', 'jusify_between')]}>
            <Text style={combineStyles(GlobalStyles, 'text_2xl')}>Total</Text>
            <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_bold')}>$51.00</Text>
        </View>
        <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm', 'margin_t_xs')]} onPress={moveNext}>
            <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Next</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 10,
    padding: 25,
    marginBottom: 10,
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
    backgroundColor: '#e6f7ff',
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
});

export default CartAddressSummary;
