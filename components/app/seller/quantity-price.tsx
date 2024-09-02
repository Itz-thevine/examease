import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type QuantityPriceDisplayProps = {
  price: number;
  quantity: number;
};

const QuantityPriceDisplay: React.FC<QuantityPriceDisplayProps> = ({ price, quantity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Quantity</Text>
        <Text style={styles.value}>{quantity}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
  },
  label: {
    color: '#999999',
    fontSize: 14,
  },
  value: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuantityPriceDisplay;
