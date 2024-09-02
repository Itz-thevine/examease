import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { combineStyles } from '@/lib'; // Assuming this is a utility function for combining styles
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const AccordionMenuItem: React.FC<{ title: string; icon: string; children?: React.ReactNode }> = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(false);
  const [animationValue] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const initialValue = expanded ? 1 : 0;
    const finalValue = expanded ? 0 : 1;

    setExpanded(!expanded);
    Animated.timing(animationValue, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false, // Use false because we're animating height
    }).start();
  };

  const rotate = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const height = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150], // Adjust this value depending on the content
  });

  return (
    <View>
      <TouchableOpacity style={styles.menuItem} onPress={toggleExpand}>
        <View style={styles.menuRow}>
          <MaIcon name={icon} size={24} color="white" />
          <Text style={styles.menuText}>{title}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <EntypoIcon name="chevron-right" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.subMenuContainer, { height }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  subMenuContainer: {
    overflow: 'hidden',
    backgroundColor: '#2A2D3D',
  },
});

export default AccordionMenuItem;
