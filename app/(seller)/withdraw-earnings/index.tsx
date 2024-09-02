import AppHeader from '@/components/shared/app-header';
import CustomModal from '@/components/shared/custom-modal';
import { combineStyles, height } from '@/lib';
import { GlobalStyles } from '@/styles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IoIcon from 'react-native-vector-icons/Ionicons';


const screenWidth = Dimensions.get('window').width;

const WithdrawScreen: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [agreeToTAC, setAgreeToTAC] = useState(false)
  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'safeArea')}>
      <CustomModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
            <Text style={[combineStyles(GlobalStyles, 'text_5xl', 'font_medium', 'color_white', 'text_center', 'line_5xl', 'margin_b_sm', 'margin_t_sm'), {width: 300}]}>Your money is on the way!</Text>
            
            <Text style={[combineStyles(GlobalStyles, 'color_white', 'font_medium', 'text_lg' ,'margin_t_sm', 'text_center', 'line_lg'), {
                width: 250
            }]}>You will get your money shortly!</Text>
           
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_royal_blue', 'padding_y_sm', 'rounded_full', 'items_center'), {width: 300, marginTop: 100}]} onPress={() =>{
                  router.push('/(seller)')
                  setIsModalOpen(false)
                }}>
                    <Text style={combineStyles(GlobalStyles, 'color_white', 'font_medium')}>Earnings</Text>
                </TouchableOpacity>
            </View>
          
        </View>
      </CustomModal>
        
      <AppHeader/>
      <ScrollView style={combineStyles(GlobalStyles, 'background_softer_blue')}>
        <View style={combineStyles(GlobalStyles, 'safeArea', 'padding_sm', 'background_softer_blue')}>
            <Text style={combineStyles(GlobalStyles, 'text_4xl', 'margin_t_sm')}>Enter your withdrawing</Text>
            <Text style={combineStyles(GlobalStyles, 'text_4xl', 'margin_b_sm')}>details</Text>

          
        
            <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Amount</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_5xl', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs', 'font_bold')} defaultValue="$2,780" />
            </View>
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <Text style={combineStyles(GlobalStyles, 'margin_b_xs', 'text_lg')}>Receiving Account</Text>
                <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm', 'rounded_xs')}>
                    <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
                        <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
                            {/* <Icon name="credit-card" size={24} color="#1E90FF"  /> */}
                            <Image
                                source={require('../../../assets/images/seller/image 18.png')}
                                style={[{ width: 70, height: 25 }]}
                                resizeMode='contain'
                            />
                            <Text style={combineStyles(GlobalStyles, 'text_lg', 'margin_l_xs')}>****1652</Text>
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={require('../../../assets/images/seller/rect1499.png')}
                                style={[{ width: 20, height: 20 }]}
                                resizeMode='contain'
                            />  
                        </TouchableOpacity>
                        {/* <Icon name="edit" size={20} color="#888" /> */}
                    </View>
                    <Text style={combineStyles(GlobalStyles, 'margin_t_sm')}>Commercial International Bank</Text>
                </View>
                <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'text_italic', 'color_gray')}>Transfers typically take 48 hours to arrive to your bank!</Text>
            </View>

         
        </View>
      </ScrollView>
    
      <View style={combineStyles(GlobalStyles, 'absolute', 'bottom_0', 'right_0', 'left_0',  )}>
        <View style={combineStyles(GlobalStyles, 'flex_row', 'margin_sm')}>
          <TouchableOpacity onPress={() => setAgreeToTAC(!agreeToTAC)}>
              <IoIcon name={agreeToTAC ? "checkbox-outline" : "square-outline"} size={20} color="#1D6AFF" />
          </TouchableOpacity>
          <Text style={combineStyles(GlobalStyles, 'text_sm', 'margin_l_xs', 'margin_b_sm')}>I agree to Tobendo’s <Text style={combineStyles(GlobalStyles, 'color_royal_blue')}>Terms & Policy</Text>.</Text>
        </View>
        <View style={combineStyles(GlobalStyles, 'padding_y_xs', 'padding_x_sm', 'background_white')}>
            <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')} onPress={() =>setIsModalOpen(true)}>
            <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Agree & Withdraw</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawScreen;
