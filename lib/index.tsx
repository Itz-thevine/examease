import { DynamicObject } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const getGreeting = () => {
    
    const currentHour = new Date().getHours();
  
    if (currentHour < 12) {
      return 'Good Morning 👋';
    } else if (currentHour < 18) {
      return 'Good Afternoon 👋';
    } else {
      return 'Good Evening 👋';
    }
}
  
export const storeData = async (key: string, value: DynamicObject): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error storing data", e);
  }
};

export const getData = async (key: string): Promise<DynamicObject | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving data", e);
    return null;
  }
};


type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
export const combineStyles = <T extends NamedStyles<T>>(
  styleSheet: T,
  ...styles: (keyof T)[]
): ViewStyle | TextStyle | ImageStyle => {
  return styles.map(style => styleSheet[style]).reduce((acc, style) => {
    return { ...acc, ...style };
  }, {});
};


export const getInitials = (nameOrEmail: string): string => {
  if (!nameOrEmail) return '';

  // If it's an email, split at '@' and take the part before it
  const name = nameOrEmail.includes('@') ? nameOrEmail.split('@')[0] : nameOrEmail;

  const words = name.trim().split(' ');

  // If the name has more than one word, take the first letter of the first two words
  if (words.length > 1) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  // If the name is a single word or derived from email, take the first two letters
  return name.slice(0, 2).toUpperCase();
};

