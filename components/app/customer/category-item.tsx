import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, ImageSourcePropType } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { combineStyles, width } from '@/lib';
import { GlobalStyles } from '@/styles';

interface CategoryItemProps {
    image: ImageSourcePropType
  category: string;
  subCategories: string[];
  isOpen: boolean;
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, subCategories, isOpen, onPress, image }) => {
  const [heightAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isOpen ? subCategories?.length * 30 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen, subCategories?.length , heightAnim]);

  return (
    <View style={styles.categoryItem}>
      <TouchableOpacity onPress={onPress} style={styles.categoryHeader}>
        <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
            <Image source={image} style={{height: 40, width: 40, marginRight: 10}} resizeMode="contain" />
            <Text style={styles.categoryText}>{category}</Text>
        </View>
        <MaterialIcon name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="#888" />
      </TouchableOpacity>
      <Animated.View style={{ overflow: 'hidden', height: heightAnim }}>
        {subCategories?.map(sub => (
          <Text style={styles.subCategoryText} key={sub}>{sub}</Text>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    marginBottom: 10,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
  },
  subCategoryText: {
    fontSize: 14,
    color: '#888',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default CategoryItem;
