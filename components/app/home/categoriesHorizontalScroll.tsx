import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent, SafeAreaView, ScrollView, Pressable } from 'react-native';
import AccordionComponent from './accordionComponent';
import { DynamicObject, Section } from '@/types';

const { width } = Dimensions.get('window');

interface iCategories {
  categories: Section[],
  selectedCategories: DynamicObject,
  setSelectedCategories: (value: DynamicObject) => void
}

const CategoriesDisplay = ({categories, selectedCategories, setSelectedCategories}: iCategories) => {
  const [activeTab, setActiveTab] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onTabPress = (index: number) => {
    setActiveTab(index);
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveTab(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10}}>

      <View style={{
        backgroundColor: 'white',
        marginTop: -10,
        borderRadius: 30,
        marginHorizontal: 8,
        paddingBottom: 16
      }}>
        <AccordionComponent 
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
         categories={categories}/>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}> 
          <Text style={{fontSize: 12, paddingRight: 8, color: '#1D6AFF'}}>
            More categories
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius:32
    // backgroundColor: "white"
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor:'white'
  },
  tabText: {
    fontSize: 16,
    color: '#aaa',
    backgroundColor: 'white'
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'medium',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3,
    marginVertical: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CategoriesDisplay;
