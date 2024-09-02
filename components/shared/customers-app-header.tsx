import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import SidebarScreen from './customer-side-bar';
import { router } from 'expo-router';

const CustomerAppHeader: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <View>
      <View style={[combineStyles(GlobalStyles, 'padding_t_sm', 'padding_x_sm', 'background_dark_blue', 'flex_row', 'items_center', 'jusify_between'), {
        paddingTop: 40
      }]}>
        <Image
          source={require('@/assets/images/mainLogo-white.png')}
          style={[GlobalStyles.logo]}
          resizeMode='contain'
        />
        <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
          <TouchableOpacity onPress={() => router.push('(customer)/cart')} style={combineStyles(GlobalStyles, 'relative', 'margin_r_sm')}>
            <Image
              source={require('@/assets/images/Group 28.png')}
              style={[{ height: 24 }]}
              resizeMode='contain'
            />
            <View style={[combineStyles(GlobalStyles, 'jusify_center', 'items_center', 'background_warning', 'rounded_full', 'absolute'), { width: 18, height: 18, right: 0 }]}>
              <Text style={combineStyles(GlobalStyles, 'color_white', 'text_xs', 'font_medium')}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSidebarVisible(!isSidebarVisible)}>
            <Image
              source={require('@/assets/images/Group 1_white.png')}
              style={[{ height: 18 }]}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>
      {isSidebarVisible && <SidebarScreen isVisible={isSidebarVisible} onClose={() => setSidebarVisible(false)} />}
    </View>
  );
};

export default CustomerAppHeader;
