import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { combineStyles, width } from '@/lib';
import { GlobalStyles } from '@/styles';
import CategoryItem from '@/components/app/customer/category-item';
import ProductCard from '@/components/app/customer/product-card';
import { cCategories, RelatedProducts } from '@/static';
import { productsItem } from '@/types';

interface RelatedProductsWrapperProps {
  openCategory: string | null;
  handlePress: (category: string) => void;
  renderInventoryItem: ({ item }: { item: productsItem }) => JSX.Element;
}

const RelatedProductsWrapper: React.FC<RelatedProductsWrapperProps> = ({
  openCategory,
  handlePress,
  renderInventoryItem,
}) => {
  return (
    <>
      
      <View style={styles.manufacturerContainer}>
        <FlatList
          data={RelatedProducts}
          renderItem={renderInventoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[combineStyles(GlobalStyles, 'gap_xl')]}
        />
      </View>
      <View style={combineStyles(GlobalStyles, 'margin_sm', 'items_center')}>
        <Image source={require('@/assets/images/customer/promo_3.png')} style={[{ width: width, height: 230 }]} resizeMode="contain" />
      </View>
      <View style={styles.manufacturerContainer}>
        <FlatList
          data={RelatedProducts}
          renderItem={renderInventoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[combineStyles(GlobalStyles, 'gap_xl')]}
        />
      </View>
      <View style={{width: '100%', height: 50}}></View>
    </>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    margin: 20,
    marginBottom: 0,
  },
  manufacturerContainer: {
    margin: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
});

export default RelatedProductsWrapper;
