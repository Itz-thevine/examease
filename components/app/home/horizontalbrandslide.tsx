import { Brand } from "@/constants";
import { DynamicObject } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get('window');
const itemWidth = width / 4;

interface HorizontalSlideProps {
  data: Brand[]
  selectedBrand: DynamicObject,
  setSelectedBrand: (value : DynamicObject) => void
}

const HorizontalSlide: React.FC<HorizontalSlideProps> = ({ data, selectedBrand, setSelectedBrand }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setSelectedBrand(item)
          }} style={[styles.itemContainer, {
            width: itemWidth, 
          }]}>
            <Ionicons name={'car-sport'} size={40} style={[styles.icon, {
              backgroundColor: selectedBrand === item ? '#4583F6' : 'white',
              color: selectedBrand === item ? 'white' : '#1D1F38',
            }]} />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.itemContentContainer}
        keyExtractor={(item) => item.id}
      />
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      }}>
        <View style={styles.progressContainer}>
            {data.map((_, index) => (
            <View key={index} style={[styles.progressDot, currentIndex === index && styles.activeDot]} />
            ))}
        </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width: 80,
  },
  progressDot: {
    width: "5%",
    height: 2,
    backgroundColor: '#e0e0e0',
  },
  activeDot: {
    width: "10%",
    backgroundColor: '#1D6AFF',
  },
  itemContentContainer: {
    marginHorizontal: 0,
    // width: "80%"
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'none',
    marginBottom: 3,
  },
  icon: {
    marginBottom: 5,
    padding: 10,
    elevation: 1, 
    borderRadius:32
  },
  title: {
    fontSize: 14,
    color: '#1D1F38',
  },
});

export default HorizontalSlide;
