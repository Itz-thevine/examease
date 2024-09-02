import AppHeader from '@/components/shared/app-header';
import CustomModal from '@/components/shared/custom-modal';
import { combineStyles, height } from '@/lib';
import { GlobalStyles } from '@/styles';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';


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
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_sm', 'margin_b_sm')}>Basic Info</Text>

          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm', 'relative')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Company Email</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs', 'font_medium')} defaultValue="alameya@gmail.com" />
            <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_white', 'absolute', 'padding_xs', 'rounded_full'), {right: 0, top: 15}]}>
              <Image
                source={require('../../../assets/images/seller/rect1499.png')}
                style={[{ width: 16, height: 16 }]}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>

          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm', 'relative')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Phone Number</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs', 'font_medium')} defaultValue="+221 123-4567-890" />
            <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_white', 'absolute', 'padding_xs', 'rounded_full'), {right: 0, top: 15}]}>
              <Image
                source={require('../../../assets/images/seller/rect1499.png')}
                style={[{ width: 16, height: 16 }]}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
          
          <View style={combineStyles(GlobalStyles, 'margin_b_sm', 'margin_t_sm', 'relative')}>
            <Text style={combineStyles(GlobalStyles, 'text_sm', 'color_gray')}>Password</Text>
            <TextInput style={combineStyles(GlobalStyles, 'text_lg', 'margin_t_xs', 'border_b_xs', 'border_gray', 'padding_b_xs', 'font_medium')} defaultValue="••••••••" secureTextEntry/>
            <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_white', 'absolute', 'padding_xs', 'rounded_full'), {right: 0, top: 15}]}>
              <Image
                source={require('../../../assets/images/seller/rect1499.png')}
                style={[{ width: 16, height: 16 }]}
                resizeMode='contain'
              />
            </TouchableOpacity>
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
          </View>

          <View style={combineStyles(GlobalStyles, 'margin_t_sm', 'margin_b_sm')}>
            <Text style={combineStyles(GlobalStyles, 'margin_b_xs', 'text_lg')}>Company</Text>
            <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm', 'rounded_xs')}>
                <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
                    <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
                        
                        <Text style={combineStyles(GlobalStyles, 'text_lg')}>Alameya Auto Parts</Text>
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
                <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'color_gray')}>5859584-205-HM</Text>
                <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'text_lg')}>License Type</Text>
            </View>
          </View>

          <View style={combineStyles(GlobalStyles, 'items_center', 'margin_t_sm')}> 
            <TouchableOpacity style={combineStyles(GlobalStyles, 'background_soft_blue', 'items_center', 'rounded_full', 'padding_sm' )} onPress={() => router.push('/(customer)/customer')}> 
                <Text style={combineStyles(GlobalStyles, 'text_lg')}>Sign Out</Text>
            </TouchableOpacity>
          </View>
                
        </View>
      </ScrollView>
    
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({})

export default WithdrawScreen;
