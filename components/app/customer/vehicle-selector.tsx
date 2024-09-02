import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

interface VehicleSelectorProps {
  selectedVehicle: string;
  setSelectedVehicle: (vehicle: string) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ selectedVehicle, setSelectedVehicle }) => {
  return (
    <View style={combineStyles(GlobalStyles, 'flex_row', 'safeArea', 'jusify_between', 'margin_b_sm')}>
      <TouchableOpacity
        style={selectedVehicle === 'car' ? combineStyles(GlobalStyles, 'padding_xs', 'padding_x_sm', 'background_warning', 'rounded_full', 'flex_row', 'items_center') : combineStyles(GlobalStyles, 'padding_xs', 'flex_row', 'items_center')}
        onPress={() => setSelectedVehicle('car')}
      >
        <MCIIcon name="car-side" size={24} color={selectedVehicle === 'car' ? 'white' : 'gray'} />
        <Text style={selectedVehicle === 'car' ? combineStyles(GlobalStyles, 'color_white', 'margin_l_xs') : combineStyles(GlobalStyles, 'color_gray', 'margin_l_xs')}>Car</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selectedVehicle === 'motorcycle' ? combineStyles(GlobalStyles, 'padding_xs', 'padding_x_sm', 'background_warning', 'rounded_full', 'flex_row', 'items_center') : combineStyles(GlobalStyles, 'padding_xs', 'flex_row', 'items_center')}
        onPress={() => setSelectedVehicle('motorcycle')}
      >
        <FAIcon name="motorcycle" size={22} color={selectedVehicle === 'motorcycle' ? 'white' : 'gray'} />
        <Text style={selectedVehicle === 'motorcycle' ? combineStyles(GlobalStyles, 'color_white', 'margin_l_xs') : combineStyles(GlobalStyles, 'color_gray', 'margin_l_xs')}>Motorcycle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selectedVehicle === 'truck' ? combineStyles(GlobalStyles, 'padding_xs', 'padding_x_sm', 'background_warning', 'rounded_full', 'flex_row', 'items_center') : combineStyles(GlobalStyles, 'padding_xs', 'flex_row', 'items_center')}
        onPress={() => setSelectedVehicle('truck')}
      >
        <MCIIcon name="truck" size={22} color={selectedVehicle === 'truck' ? 'white' : 'gray'} />
        <Text style={selectedVehicle === 'truck' ? combineStyles(GlobalStyles, 'color_white', 'margin_l_xs') : combineStyles(GlobalStyles, 'color_gray', 'margin_l_xs')}>Truck</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VehicleSelector;
