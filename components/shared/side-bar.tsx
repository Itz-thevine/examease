import React, { useRef, useMemo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineStyles, getInitials, height, width } from '@/lib';
import { GlobalStyles } from '@/styles';
import { router, useRouter } from 'expo-router';
import { getAuth, signOut } from "firebase/auth";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/app/firebaseConfig';

const screenWidth = Dimensions.get('window').width;

const Sidebar: React.FC<{ isVisible: boolean, onClose: () => void }> = ({ isVisible, onClose }) => {
  const sidebarAnim = useRef(new Animated.Value(-screenWidth)).current;

  
  const auth = getAuth();
  const user = auth.currentUser;



  
  console.log('user', user)


  const [userSnap, setUserSnap] = useState<any>(null);

  useEffect(() => {
    const fetchUserDoc = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = (doc(db, 'users', `${user?.email && (user?.email).replace(/[@.]/g, '-')}`));
        onSnapshot(userRef, (doc) => {
          setUserSnap(doc.data())
        });
      }
    };

    fetchUserDoc(); // Call the async function
  }, []); // Empty dependency array ensures this runs once on mount



  console.log("userSnap", userSnap)

 

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
         <View></View>
          <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

         <View style={styles.profileContainer}>
            {
              user?.photoURL ? (
                <Image
                  source={{ uri: user?.photoURL }} // Correct syntax for external URL
                  style={styles.profileImage}
                />
              ) : (
                <View style={[styles.profileImage, combineStyles(GlobalStyles, 'safeArea', 'jusify_center', 'items_center', 'background_softer_blue', 'rounded_full')]}><Text style={combineStyles(GlobalStyles, 'text_3xl')}>{user?.displayName ? (user.displayName && getInitials(user.displayName) ): (user?.email && getInitials(user.email))}</Text></View>
              )
            }
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>

        <View style={[combineStyles(GlobalStyles, 'margin_b_sm'), styles.infoContainer]}>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>
              Average reading duration: <Text style={styles.boldText}>{userSnap?.daily_study_time ?? 0}</Text>
            </Text>
            <TouchableOpacity style={styles.editButton}>
              {/* <Icon name="edit" size={20} color="#FFFFFF" /> */}
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoText}>
              Preferred study media: <Text style={styles.boldText}>{userSnap?.preferred_study_device ?? 'none'}</Text>
            </Text>
            <TouchableOpacity style={styles.editButton}>
              {/* <Icon name="edit" size={20} color="#FFFFFF" /> */}
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>
              Regular breaks: <Text style={styles.boldText}>{userSnap?.breaks_in_between ?? 0}</Text>
            </Text>
            <TouchableOpacity style={styles.editButton}>
              {/* <Icon name="edit" size={20} color="#FFFFFF" /> */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={[combineStyles(GlobalStyles, 'padding_t_sm', 'padding_b_sm', 'margin_b_sm'), { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
          <MenuContainer>
            <MenuItem title="Current" icon="new" onPress={() => router.push('/(seller)/seller')} />
            <MenuItem title="Old Routines" icon="clipboard-list-outline" onPress={() => router.push('/(seller)/seller')} />
            <MenuItem title="Generate new exam schedule" icon="currency-usd" onPress={() => router.push('/(seller)/seller')} />
          </MenuContainer>
        </View>

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
  <TouchableOpacity style={[combineStyles(GlobalStyles, 'gap_lg'),  styles.menuItem]} onPress={onPress}>
    <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'gap_lg')}>
      {icon && <View style={{width: 10, height: 10, backgroundColor: 'white', borderRadius: 100}}></View>}
      <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white')}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const LanguageButton: React.FC = () => {
  const auth = getAuth();
  const router = useRouter()

  const handleSignOut = () => {

    signOut(auth).then(() => {
      router.push('/(auth)/signin')
    }).catch((error) => {
      const errorMessage = error.message;
      Alert.alert('Error', errorMessage);
    });

  }
  return(

  <TouchableOpacity style={[combineStyles(GlobalStyles, 'padding_sm'), styles.languageButton]} onPress={() => handleSignOut()}>
    <Text style={styles.languageText}>Sign out</Text>
  </TouchableOpacity>
)}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#1A1A3C', // Dark background color
    paddingTop: 20,
  },
  header: {
    alignItems: 'flex-end',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  emailText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  infoItem: {
    backgroundColor: '#0056FC',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#1A1A3C',
    padding: 5,
    borderRadius: 20,
  },
  linksContainer: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  boldLinkText: {
    fontWeight: 'bold',
  },
  bottomWave: {
    flex: 1,
    justifyContent: 'flex-end',
    // This can be an SVG wave or a styled view for the wave effect
  },
});

export default Sidebar;
