import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '@/components/shared/custom-modal';
import { router } from 'expo-router';
import AppHeader from '@/components/shared/app-header';

const CompanyDetailsScreen = () => {
  const [selectedLicenseType, setSelectedLicenseType] = useState('License Type');
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)

  const lincenses = ['license 1', 'license 2', 'license 3', 'license 4']

  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'safeArea')}>
      <CustomModal
        isVisible={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        height={300}
      >
        <View style={combineStyles(GlobalStyles, 'padding_sm')}>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_medium')}>License Types</Text>
          <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
            {
              lincenses.map((lincense) => (
                <Pressable onPress={() => {setSelectedLicenseType(lincense); setIsLicenseModalOpen(false)}}>
                  <Text style={combineStyles(GlobalStyles, 'text_lg', 'padding_y_xs')}>{lincense}</Text>
                </Pressable>
              ))
            }
          </View>
        </View>
      </CustomModal>

      <AppHeader/>
      <ScrollView style={[combineStyles(GlobalStyles, 'background_soft_blue')]}>
        <View style={combineStyles(GlobalStyles, 'safeArea', 'padding_sm')}>
          <Text style={combineStyles(GlobalStyles, 'text_4xl', 'margin_t_sm')}>Enter your company’s </Text>
          <Text style={combineStyles(GlobalStyles, 'text_4xl', 'margin_b_sm')}>details</Text>

          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Company Name</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs')} defaultValue="Alameya Auto Parts" />
          </View>

          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Registration Number</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs')} defaultValue="5859584-205-HM" />
          </View>

          <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_white', 'rounded_full', 'flex_row', 'jusify_between', 'padding_sm', 'margin_t_sm')]} onPress={() => setIsLicenseModalOpen(true)}>
            <Text style={combineStyles(GlobalStyles, 'text_lg')}>{selectedLicenseType}</Text>
            <Icon name={ 'chevron-down'} size={20} style={combineStyles(GlobalStyles, 'color_gray')}/>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm' )}>
        <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')} onPress={() =>router.push('/bank-details')}>
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CompanyDetailsScreen;
