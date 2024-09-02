import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height: number ;
  hasCloseBtn?: false;
  contentBackground?: string
  title?: string
  back?: boolean
}

const CustomModal: React.FC<CustomModalProps> = ({ isVisible, onClose, children, height, hasCloseBtn = true, contentBackground= 'white', title, back }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[combineStyles(GlobalStyles, 'safeArea', 'jusify_end' ), {backgroundColor: 'rgba(31, 36, 58, 0.9)'}]}>

        <View style={[combineStyles(GlobalStyles, 'flex_row', 'items_center', 'jusify_between', 'margin_sm')]}>
          {
              back && (
                  <TouchableOpacity style={combineStyles(GlobalStyles, 'align_self', 'padding_xs',)} >
                      <Ionicons name="chevron-back"  style={combineStyles(GlobalStyles, 'text_5xl', 'color_gray')} size={10}/>
                  </TouchableOpacity>
              )
          }
          {
            title && (
              <Text style={combineStyles(GlobalStyles, 'text_2xl', 'color_white')}>{title}</Text>
            )
          }
          {
              hasCloseBtn && (
                  <TouchableOpacity style={combineStyles(GlobalStyles, 'align_self', 'padding_xs')} onPress={onClose}>
                      <Text style={combineStyles(GlobalStyles, 'text_5xl', 'color_gray')}>×</Text>
                  </TouchableOpacity>
              )
          }
        </View>
        <View style={[combineStyles(GlobalStyles, 'background_white', 'padding_sm'), { height , backgroundColor: contentBackground}]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};


export default CustomModal;
