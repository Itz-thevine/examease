import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { combineStyles, width } from '@/lib';
import { GlobalStyles } from '@/styles';
import CategoryItem from '@/components/app/customer/category-item';
import ProductCard from '@/components/app/customer/product-card';
import { cCategories, RelatedProducts } from '@/static';
import { productsItem } from '@/types';

interface CategoriesAndRelatedProductsProps {
  openCategory: string | null;
  handlePress: (category: string) => void;
  renderInventoryItem: ({ item }: { item: productsItem }) => JSX.Element;
}

const CategoriesAndRelatedProducts: React.FC<CategoriesAndRelatedProductsProps> = ({
  openCategory,
  handlePress,
  renderInventoryItem,
}) => {
  return (
    <>
      <View style={styles.categoryContainer}>
        {cCategories.map(({ category, subCategories, icon }) => (
          <CategoryItem
            image={icon}
            key={category}
            category={category}
            subCategories={subCategories}
            isOpen={openCategory === category}
            onPress={() => handlePress(category)}
          />
        ))}
      </View>
      <View style={combineStyles(GlobalStyles, 'items_center', 'margin_t_sm')}> 
        <TouchableOpacity style={combineStyles(GlobalStyles, 'background_soft_blue', 'items_center', 'rounded_full', 'padding_x_sm', 'padding_t_xs', 'padding_b_xs' )}> 
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_gray')}>More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.manufacturerContainer}>
        <Text style={styles.sectionHeader}>Related Products</Text>
        <FlatList
          data={RelatedProducts}
          renderItem={renderInventoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[combineStyles(GlobalStyles, 'gap_xl')]}
        />
      </View>
      <View style={combineStyles(GlobalStyles, 'margin_sm', 'items_center')}>
        <Image source={require('@/assets/images/customer/promo_2.png')} style={[{ width: width, height: 230 }]} resizeMode="contain" />
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

export default CategoriesAndRelatedProducts;
