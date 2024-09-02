import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppHeader from '@/components/shared/app-header';
import { combineStyles, height } from '@/lib';
import { GlobalStyles } from '@/styles';
import Inventory from '@/components/app/seller/inventory-V1';
import CustomTabs from '@/components/app/custom-tab';
import CustomModal from '@/components/shared/custom-modal';
import ProductSuggestion from '@/components/app/seller/product-suggestion-list';
import { router } from 'expo-router';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/app/firebaseConfig';
import { getAuth } from 'firebase/auth';

const OngoingOrders: React.FC = () => <View style={combineStyles(GlobalStyles, 'background_soft_blue', 'safeArea')}></View>;
const Inventories: React.FC = () => <Inventory/>;
const Earnings: React.FC = () => <View style={combineStyles(GlobalStyles, 'background_soft_blue', 'safeArea')}></View>;

const Tab = createMaterialTopTabNavigator();

const SellerScreen: React.FC = () => {
  const [isProductListModal, setIsProductListModal] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'Current' | 'Old Routines'>('Current');
  const [userSnap, setUserSnap] = useState<any>(null);

  useEffect(() => {
    const fetchUserDoc = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = (doc(db, 'users', `${user?.email && (user?.email).replace(/[@.]/g, '-')}`));
        onSnapshot(userRef, (doc) => {
          setUserSnap(doc.data())
        });
      }
    };

    fetchUserDoc(); // Call the async function
  }, []); // Empty dependency array ensures this runs once on mount


  return (
    <View style={{ flex: 1 }}>
      <CustomModal
        isVisible={userSnap && userSnap.daily_study_time === null}
        onClose={() => setIsProductListModal(false)}
        height={400}
      >
        <View style={combineStyles(GlobalStyles, 'padding_xs')}>
          <ProductSuggestion setIsVisible={setIsProductListModal} userSnap={userSnap}/>
        </View>
      </CustomModal>
      <AppHeader />
      <CustomTabs currentData={userSnap ? userSnap.schedules : []}  currentCount={userSnap ? userSnap.schedules.length : 0} oldRoutinesCount={0} setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <View style={combineStyles(GlobalStyles, 'background_white', 'padding_x_sm', 'padding_y_xs')}>
        <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')} onPress={() => router.push('/(seller)/add-new-inventory')}>
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Add new exam schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SellerScreen;
