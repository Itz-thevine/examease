import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { combineStyles, height } from '@/lib';
import { GlobalStyles } from '@/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '@/components/shared/custom-modal';
import AppHeader from '@/components/shared/app-header';
import { router } from 'expo-router';

const BankDetailsScreen = () => {
  const [selectedLicenseType, setSelectedLicenseType] = useState('Account Type');
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false)
  const [isSellerSuccessModalOpen, setIsSellerSuccesModalOpen] = useState(false)
  const [agreeToTAC, setAgreeToTAC] = useState(false)

  const lincenses = ['Account 1', 'Account 2', 'Account 3', 'Account 4']

  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'safeArea')}>
      <CustomModal
        isVisible={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        height={300}
      >
        <View style={combineStyles(GlobalStyles, 'padding_sm')}>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_medium')}>Account Types</Text>
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
      <CustomModal
        isVisible={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        height={350}
      >
        <View style={combineStyles(GlobalStyles, 'padding_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_medium')}>Are you sure you want to start</Text>
            <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_medium', 'margin_b_sm')}>selling on Tobendo?</Text>
            <View style={combineStyles(GlobalStyles, 'margin_t_sm', 'flex_row')}>
            <TouchableOpacity onPress={() => setAgreeToTAC(!agreeToTAC)}>
                <Icon name={agreeToTAC ? "checkbox-outline" : "square-outline"} size={20} color="#1D6AFF" />
            </TouchableOpacity>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'margin_l_xs', 'margin_b_sm')}>I agree to Tobendo’s <Text style={combineStyles(GlobalStyles, 'color_royal_blue')}>Terms & Policy</Text>.</Text>
            </View>
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'padding_y_sm', 'rounded_full', 'items_center')} onPress={() => {
                    setIsSellerSuccesModalOpen(true)
                    setIsSellerModalOpen(false)
                }}>
                    <Text style={combineStyles(GlobalStyles, 'color_white', 'font_medium')}>Yes, Submit Request</Text>
                </TouchableOpacity>
            </View>
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <TouchableOpacity style={combineStyles(GlobalStyles, 'background_white', 'padding_y_sm', 'rounded_full', 'items_center')} onPress={() => setIsSellerModalOpen(false)}>
                    <Text style={combineStyles(GlobalStyles, 'color_gray', 'font_medium')}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
      </CustomModal>
      <CustomModal
        isVisible={isSellerSuccessModalOpen}
        onClose={() => setIsSellerSuccesModalOpen(false)}
        height={height}
        contentBackground={'transparent'}
        hasCloseBtn={false}
      >
        <View style={combineStyles(GlobalStyles, 'padding_sm', 'items_center', 'jusify_center', 'safeArea')}>
            <Image
                source={require('@/assets/images/success.png')}
                style={[{width: 180, height: 180}, GlobalStyles.margin_sm]}
                resizeMode="contain"
            />
            <Text style={[combineStyles(GlobalStyles, 'text_5xl', 'font_medium', 'color_white', 'text_center', 'line_5xl', 'margin_b_sm', 'margin_t_sm'), {width: 300}]}>Your Request has been submitted successfully</Text>
            
            <Text style={[combineStyles(GlobalStyles, 'color_white', 'font_medium', 'text_lg' ,'margin_t_sm', 'text_center', 'line_lg'), {
                width: 250
            }]}>We will review your request and activate your account shortly!</Text>
           
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_royal_blue', 'padding_y_sm', 'rounded_full', 'items_center'), {width: 300, marginTop: 100}]} onPress={() =>{
                  router.push('/(seller)/seller')
                  setIsSellerSuccesModalOpen(false)
                }}>
                    <Text style={combineStyles(GlobalStyles, 'color_white', 'font_medium')}>Check Account</Text>
                </TouchableOpacity>
            </View>
          
        </View>
      </CustomModal>
        
      <AppHeader/>
      <ScrollView style={combineStyles(GlobalStyles, 'background_soft_blue')}>
        <View style={combineStyles(GlobalStyles, 'safeArea', 'padding_sm', 'background_soft_blue')}>
          <Text style={combineStyles(GlobalStyles, 'text_4xl', 'margin_t_sm')}>Enter your receiving bank</Text>
          <Text style={combineStyles(GlobalStyles, 'text_4xl', 'margin_b_sm')}>accoun details</Text>

          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Account Holder Name</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs')} defaultValue="Alameya Auto Parts" />
          </View>

          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Account Number</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs')} defaultValue="5859584-205-HM" />
          </View>
        
          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Routing Number</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs')} defaultValue="5859584-205-HM" />
          </View>

          <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_white', 'rounded_full', 'flex_row', 'jusify_between', 'padding_sm', 'margin_t_sm')]} onPress={() => setIsLicenseModalOpen(true)}>
            <Text style={combineStyles(GlobalStyles, 'text_lg')}>{selectedLicenseType}</Text>
            <Icon name={ 'chevron-down'} size={20} style={combineStyles(GlobalStyles, 'color_gray')}/>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm' )}>
        <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')} onPress={() =>setIsSellerModalOpen(true)}>
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BankDetailsScreen;
