import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TobendoButtonProps {
  text?: string;
  onPress: () => void;
  iconName?: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
}

const TobendoButton: React.FC<TobendoButtonProps> = ({
  text,
  onPress,
  iconName,
  buttonStyle,
  textStyle,
  iconStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
      {iconName && <Icon name={iconName} size={24} color="#fff" style={iconStyle} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    gap: 4
},
  text: {
    fontSize: 16,
    color: '#00c7b1',
    marginBottom: 2
  },
});

export default TobendoButton;
