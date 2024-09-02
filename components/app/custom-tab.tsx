import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Inventory from './seller/inventory-V1';
import Earnings from './seller/earnings-V1';
import OrderTabs from './seller/order-V1';

interface sellerTab {
  selectedTab: 'Current' | 'Old Routines';
  setSelectedTab: (value: 'Current' | 'Old Routines') => void;
  currentCount: number; // Add count for Current tab
  oldRoutinesCount: number; // Add count for Old Routines tab
  currentData: any[]
}

const CustomTabs: React.FC<sellerTab> = ({ selectedTab, setSelectedTab, currentCount, oldRoutinesCount , currentData}) => {

  const renderContent = () => {
    switch (selectedTab) {
      case 'Current':
        return <OrderTabs  data={currentData}/>;
      case 'Old Routines':
        return <Inventory />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Current' && styles.activeTab]}
          onPress={() => setSelectedTab('Current')}
        >
          <Text style={[styles.tabText, selectedTab === 'Current' && styles.activeTabText]}>
            Current 
          </Text>
          {selectedTab === 'Current' && <Text style={[combineStyles(GlobalStyles, 'background_danger', 'color_white' ,'rounded_full'), {
            paddingVertical: 10, paddingHorizontal: 12
          }]}>{currentCount}</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Old Routines' && styles.activeTab]}
          onPress={() => setSelectedTab('Old Routines')}
        >
          <Text style={[styles.tabText, selectedTab === 'Old Routines' && styles.activeTabText]}>
            Old Routines 
          </Text>
          {selectedTab === 'Old Routines' && <Text style={[combineStyles(GlobalStyles, 'background_danger', 'color_white' ,'rounded_full'), {
            paddingVertical: 10, paddingHorizontal: 12
          }]}>{oldRoutinesCount}</Text>}
        </TouchableOpacity>
      </View>
      <View>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    flexDirection: 'row', 
    justifyContent: 'center',
    gap: 8
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#f1c40f',
  },
  tabText: {
    color: '#333',
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  badge: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 18,
  },
});

export default CustomTabs;
