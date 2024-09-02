import StockStatus from '@/components/stock-status';
import { combineStyles, height, width } from '@/lib';
import { inventoryData } from '@/static';
import { GlobalStyles } from '@/styles';
import { InventoryItem } from '@/types';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TopSellerItemCard from './top-seller-item-card-V1';
import InventoryItemCard from './inventory-item-card';
import CustomModal from '@/components/shared/custom-modal';
import ProductSuggestion from './product-suggestion-list';
import ArtIcon from 'react-native-vector-icons/AntDesign';

const Inventory: React.FC = () => {
  const [isProductListModal, setIsProductListModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      // You can replace this with your actual data fetching logic
      setInventoryItems(inventoryData);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second delay for loading
  }, []);

  const renderTopSellerItem = ({ item }: { item: InventoryItem }) => (
    <TopSellerItemCard item={item} />
  );

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm', 'rounded_xs')}>
      <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
        <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
          <Text style={[combineStyles(GlobalStyles, 'text_2xl', 'font_bold'), { textDecorationLine: 'line-through' }]}>itle</Text>
        </View>
        <TouchableOpacity>
          <View style={[combineStyles(GlobalStyles, 'background_softer_blue', 'flex_row', 'items_center', 'padding_xs', 'rounded_full')]}>
            <ArtIcon name='delete' size={20} color={'#A2112A'} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={combineStyles(GlobalStyles, 'jusify_between', 'flex_row', 'items_center')}>
        <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'text_lg')}>23- 25th Oct. 2024</Text>
        <Text style={combineStyles(GlobalStyles, 'margin_t_xs')}>closed</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
    }

    if (inventoryItems.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No items found</Text>
          <Text style={styles.subText}>Start by adding new inventory items.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={inventoryItems}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[combineStyles(GlobalStyles, 'gap_xl')]}
      />
    );
  };

  return (
    <SafeAreaView style={[combineStyles(GlobalStyles, 'background_softer_blue')]}>
      <CustomModal
        isVisible={isProductListModal}
        onClose={() => setIsProductListModal(false)}
        height={height - 100}
      >
        <View style={combineStyles(GlobalStyles, 'padding_xs')}>
          <ProductSuggestion setIsVisible={setIsProductListModal} />
        </View>
      </CustomModal>
      <View style={combineStyles(GlobalStyles)}>
        <ScrollView style={combineStyles(GlobalStyles, 'padding_sm')}>
          {renderContent()}
          <View style={{ width: '100%', height: 200 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 100,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
  },
});

export default Inventory;
