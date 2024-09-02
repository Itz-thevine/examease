import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EICon from 'react-native-vector-icons/Entypo';

 interface Icounter {
    count: number;
    setCount: (value : number) => void

}
const Counter: React.FC<Icounter> = ({count, setCount}) => {
   

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <View style={combineStyles(GlobalStyles, 'background_softer_blue', 'flex_row', 'items_center' , 'padding_xs', 'rounded_full')}>
            <TouchableOpacity  onPress={decrement} style={combineStyles(GlobalStyles, 'margin_r_xs')}><EICon name='minus' style={combineStyles(GlobalStyles, 'text_lg', 'color_gray')}/></TouchableOpacity>
            <Text  style={combineStyles(GlobalStyles, 'text_2xl')}>{count}</Text>
            <TouchableOpacity style={combineStyles(GlobalStyles, 'margin_l_xs')}  onPress={increment}><EICon name='plus' style={combineStyles(GlobalStyles, 'text_lg', 'color_gray')}/></TouchableOpacity>
        </View>
    );
};

export default Counter;
