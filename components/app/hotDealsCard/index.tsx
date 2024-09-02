import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

interface CustomCardProps {
  title: string;
  subtitle: string;
  iconUri: string;
  backgroundColor: string;
  onButtonPress: () => void;
}

const HotDealsCard: React.FC<CustomCardProps> = ({ title, subtitle, iconUri, backgroundColor, onButtonPress }) => {
  return (
    <ImageBackground
    //   source={require('../../../assets/images/background-overlay.png')} // replace with the correct path to your background image
      style={[styles.card, {backgroundColor}]}
      imageStyle={{ borderRadius: 10 }}
    >
      <View style={styles.contentContainer}>
        <Image 
          source={require('../../../assets/images/hot-deals.png')} 
          style={styles.icon} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'column',
    width: "70%"
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#1D6AFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HotDealsCard;
