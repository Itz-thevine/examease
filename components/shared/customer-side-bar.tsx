import React, { useRef, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineStyles, height } from '@/lib';
import { GlobalStyles } from '@/styles';
import { router } from 'expo-router';
import AccordionMenuItem from './accordion-menu-item';

const screenWidth = Dimensions.get('window').width;

const Sidebar: React.FC<{ isVisible: boolean, onClose: () => void }> = ({ isVisible, onClose }) => {
  const sidebarAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: isVisible ? 0 : -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const containerStyles = useMemo(
    () => [styles.sidebar, { transform: [{ translateX: sidebarAnim }] }],
    [sidebarAnim]
  );

  return (
    <Animated.View style={containerStyles}>
      <ScrollView
        style={[combineStyles(GlobalStyles, 'safeArea'), styles.container]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'jusify_between', 'margin_r_sm', 'margin_l_sm')}>
          <Image
            source={require('@/assets/images/mainLogo-white.png')}
            style={[GlobalStyles.logo]}
            resizeMode="contain"
          />
          <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={combineStyles(GlobalStyles, 'padding_l_sm', 'padding_r_sm')}>
          <Image
            source={require('@/assets/images/Group 41.png')}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>

        <View style={[combineStyles(GlobalStyles, 'padding_l_sm', 'padding_r_sm'), styles.emailContainer]}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Text style={styles.email}>examplegroup@gmail.com</Text>
          </TouchableOpacity>
          <EntypoIcon name="chevron-right" size={24} color="white" />
        </View>

        <View style={combineStyles(GlobalStyles, 'margin_sm')}>
            <TouchableOpacity style={combineStyles(GlobalStyles, 'margin_b_sm')} onPress={() => router.push('/cart')}>
                <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'gap_md')}>
                    <Image
                        source={require('@/assets/images/Group 28.png')}
                        style={[{ height: 24 }]}
                        resizeMode='contain'
                    />
                    <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white')}>{'Cart'}</Text>
                    <View style={[combineStyles(GlobalStyles, 'jusify_center', 'items_center', 'background_warning', 'rounded_full'), { width: 18, height: 18}]}>
                        <Text style={combineStyles(GlobalStyles, 'color_white', 'text_xs', 'font_medium')}>2</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={combineStyles(GlobalStyles, 'margin_b_sm')} onPress={() => router.push('/orders')}>
                <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'gap_md')}>
                    <Image
                        source={require('@/assets/images/orders.png')}
                        style={[{ height: 22 }]}
                        resizeMode='contain'
                    />
                    <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white')}>{'Orders'}</Text>
                </View>
            </TouchableOpacity>            
        </View>

        <View style={[combineStyles(GlobalStyles, 'padding_t_sm', 'padding_b_sm', 'margin_b_sm'), { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                <AccordionMenuItem title="Cars" icon="car">
                    <Text style={styles.subMenuText}>Sedans</Text>
                    <Text style={styles.subMenuText}>SUVs</Text>
                    <Text style={styles.subMenuText}>Convertibles</Text>
                </AccordionMenuItem>
                <AccordionMenuItem title="Motorbikes" icon="motorbike">
                    <Text style={styles.subMenuText}>Sports</Text>
                    <Text style={styles.subMenuText}>Cruisers</Text>
                    <Text style={styles.subMenuText}>Touring</Text>
                </AccordionMenuItem>
                <AccordionMenuItem title="Trucks" icon="truck">
                    <Text style={styles.subMenuText}>Pickup</Text>
                    <Text style={styles.subMenuText}>Lorry</Text>
                </AccordionMenuItem>
                <AccordionMenuItem title="Tires" icon="car-tire-alert">
                    <Text style={styles.subMenuText}>All-Season</Text>
                    <Text style={styles.subMenuText}>Winter</Text>
                </AccordionMenuItem>
                <AccordionMenuItem title="Engine Oil" icon="oil">
                    <Text style={styles.subMenuText}>Synthetic</Text>
                    <Text style={styles.subMenuText}>Conventional</Text>
                </AccordionMenuItem>
                <AccordionMenuItem title="Tools" icon="wrench">
                    <Text style={styles.subMenuText}>Hand Tools</Text>
                    <Text style={styles.subMenuText}>Power Tools</Text>
                </AccordionMenuItem>
        </View>

        <MenuContainer>
          <MenuItem title="Switch to Seller" onPress={() => router.push('/(seller)/onboarding-seller')} />
          <MenuItem title="Help & Support" onPress={() => router.push('/')} />
        </MenuContainer>

        <View style={[styles.footer, combineStyles(GlobalStyles, 'padding_sm')]}>
          <LanguageButton />
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const MenuContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={[combineStyles(GlobalStyles, 'padding_l_sm', 'padding_r_sm'), styles.menuContainer]}>
    {children}
  </View>
);

const MenuItem: React.FC<{ title: string; onPress: () => void; icon?: string }> = ({ title, onPress, icon }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
      {icon && <MaIcon name={icon} size={24} color="white" style={combineStyles(GlobalStyles, 'margin_r_sm')} />}
      <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white')}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const LanguageButton: React.FC = () => (
  <TouchableOpacity style={[combineStyles(GlobalStyles, 'padding_sm'), styles.languageButton]}>
    <MaIcon name="web" color="white" size={16} />
    <Text style={styles.languageText}>English</Text>
    <EntypoIcon name="chevron-down" color="white" size={24} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    subMenuText: {
    color: 'white',
    padding: 10,
    paddingLeft: 35,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: screenWidth,
    backgroundColor: '#1A1D2D',
    zIndex: 1000,
    height: height
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 20, // Ensures content doesn't cut off
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButton: {
    marginLeft: 'auto',
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 30,
  },
  email: {
    color: 'white',
    fontSize: 16,
  },
  menuContainer: {
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
  },
  footer: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  helpText: {
    color: 'white',
    fontSize: 20,
    marginTop: 60,
  },
  languageButton: {
    marginTop: 10,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  languageText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Sidebar;
