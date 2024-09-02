import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { DynamicObject } from '@/types';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

interface CategoryComponentProps {
  categories: string[];
  subCategories: { [key: string]: string[] };
  buttonText: string;
  onButtonPress: (categories: string[]) => void;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({ categories, subCategories, buttonText, onButtonPress }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  const handleAddCategory = () => {
    if (selectedCategory) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
      setSelectedCategory('');
      setSelectedSubCategory('');
    } else if (selectedSubCategory) {
      setSelectedCategories([...selectedCategories, selectedSubCategory]);
      setSelectedSubCategory('');
    }
  };

  const getSubCategories = () => {
    if (selectedCategories.length === 0) {
      return categories;
    }
    const lastSelectedCategory = selectedCategories[selectedCategories.length - 1];
    return subCategories[lastSelectedCategory] || [];
  };

  return (
    <View style={combineStyles(GlobalStyles, 'background_transparent')}>
      <Text style={[combineStyles(GlobalStyles, 'text_sm', 'margin_b_xs'), { marginTop: 20 }]}>Category</Text>
      <ScrollView horizontal>
        <View style={styles.breadcrumbContainer}>
          {selectedCategories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.breadcrumbItem}>
              <Text style={styles.breadcrumbText}>{category}</Text>
              {index < selectedCategories.length - 1 && (
                <Ionicons name="chevron-forward" size={16} color="#8F919C" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.controls}>
        <View style={combineStyles(GlobalStyles, 'background_white' , 'rounded_full', 'safeArea', 'margin_r_sm')}>
          <Picker
            selectedValue={selectedCategories.length === 0 ? selectedCategory : selectedSubCategory}
            style={[combineStyles(GlobalStyles, 'safeArea', 'color_gray', ), {height: 40, overflow: 'hidden'}]}
            onValueChange={(itemValue) => {
              if (selectedCategories.length === 0) {
                setSelectedCategory(itemValue);
              } else {
                setSelectedSubCategory(itemValue);
              }
            }}
          >
            <Picker.Item label={getSubCategories().length > 0 ? 'Select category' : 'No category'} value="" />
            {getSubCategories().map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>

        </View>
        <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'padding_x_sm', 'padding_y_xs', 'rounded_full')} onPress={handleAddCategory}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    color: '#007BFF',
    fontSize: 18,
    marginRight: 5,
    fontWeight: '400'
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },

  addButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 32,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1F243A',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CategoryComponent;
