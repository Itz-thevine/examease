import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList, Modal, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import SelectModelModal from '@/components/app/home/selectModelModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationPopover from '@/components/app/NotificationPopover';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { NotifyOnChangeProps, QueryClient } from '@tanstack/query-core'
import { useFocusNotifyOnChangeProps } from '@/hooks/useFocusNotifyOnChangeProps';
import { useAuth } from '@/context/auth';
import { getGreeting } from '@/lib';
import { ActivityIndicator } from 'react-native-paper';
import HotDealsCard from '@/components/app/hotDealsCard';
import HorizontalSlide from '@/components/app/home/horizontalbrandslide';
import { Brand } from '@/constants';
import CategoriesDisplay from '@/components/app/home/categoriesHorizontalScroll';
import { useBrands } from '@/hooks/app/useBrand';
import { useCategories } from '@/hooks/app/useCategories';
import { useProducts } from '@/hooks/app/useProducts';
import { CarPart, DynamicObject } from '@/types';
import SearchProductToList from '@/components/app/home/searchProductToList';

const { width } = Dimensions.get('window');
const SCROLL_AMOUNT = width * 0.5; // Adjust scroll amount as needed


const HomeScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isVerifyErrorModal, setIsVerifyErrorModal] = useState(false);
  const [verifyErrorModalMessage, setVerifyErrorModalMessage] = useState('');
  const [isProductSearching, setIsProductSearching] = useState<boolean>(false);
  const [isListing, setIsListing] = useState<boolean>(false)
  const [selectedBrand, setSelectedBrand] = useState<DynamicObject>({})
  const [selectedCategories, setSelectedCategories] = useState<DynamicObject>({})

  const { user, SetEmail } = useAuth();
  const { data: fetchedBrands} = useBrands();
  const {data: fetchedCategories} = useCategories()
  const {data: fetchedProduct, isFetchingNextPage, fetchNextPage, isLoading: isProductLoading, refetch} =  useProducts({
    assemblyGroupNodeId: selectedCategories?.assemblyGroupNodeId ?? 0
  })

  const products =  fetchedProduct?.pages.flatMap(page => page.articles) || []
  // const products = fetchedProduct?.pages[0]?.articles || []

  const categories = (fetchedCategories?.data?.array)?.slice(0,7) || []

  const brandData = fetchedBrands?.counts || []; 
  const reducedData = brandData.slice(0,20)
  // const { data: {brandData} } = useBrands();


  // console.log('selectedBrand', selectedBrand)

  useEffect(() => {
   refetch() 
  }, [selectedCategories])

  useEffect(() => {
    const loadProfileType = async () => {
      try {
        const storedProfileType = await AsyncStorage.getItem('isSeller');
        if (storedProfileType !== null) {
          setIsSeller(JSON.parse(storedProfileType));
        }
      } catch (error) {
        console.error('Failed to load profile type', error);
      }
    };
    loadProfileType();
  }, []);

  const notifyOnChangeProps = useFocusNotifyOnChangeProps(['data', 'error']);

  const { data, isLoading } = useQuery({
    queryKey: ['myKey', user],
    queryFn: async () => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/profile/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.access_token}`
        },
      });
      return response.json();
    },
  });

  const handleVerify = async () => {
    setIsVerifyLoading(true);
    setIsVerifyErrorModal(false);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/profile/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          otp_type: 'email_verification',
        }),
      });

      const otpResult = await response.json();
      setIsVerifyLoading(false);

      if (otpResult.message) {
        console.log('data.email', data.email)
        SetEmail(data.email)
        router.push('/(auth)/otpScreen');
      } else {
        setVerifyErrorModalMessage(otpResult.detail || 'Unknown error');
        setIsVerifyErrorModal(true);
      }
    } catch (error) {
      setVerifyErrorModalMessage(`OTP resend failed: ${error || 'Unknown error'}`);
      setIsVerifyErrorModal(true);
      setIsVerifyLoading(false);
    }
  };

  const renderCarPartItem = ({ item }: { item: CarPart }) => (
    <View style={styles.carPartItem}>
      <Image source={{ uri: item?.images?.medium ?? 'https://eadn-wc03-5191752.nxedge.io/wp-content/uploads/CarEngine2.jpg.webp' }} style={styles.carPartImage} />
      <View style={styles.carPartContent}>
        <Text style={styles.carPartName}>{item?.Description}</Text>
        <View style={styles.carPartRating}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text>{item['Manufacturer Part Number']}</Text>
          <Text style={styles.carPartCondition}>{item.brand_id}</Text>
        </View>
        <Text style={styles.carPartPrice}>{item.mfrId}</Text>
      </View>
      <Ionicons name="heart-outline" size={24} color="black" style={styles.favoriteIcon} />
    </View>
  );

  const renderBrandItem = ({ item }: { item: Brand }) => (
    <TouchableOpacity style={styles.brandItem} onPress={() => setIsModelOpen(true)}>
      <Ionicons name={item.icon} size={40} color="#000" style={styles.brandIcon} />
      <Text style={styles.brandName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const loadMoreProducts = () => {
    if (!isFetchingNextPage) {
    // if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const paddingToBottom = 20;
    const topItems = 950;
    if (contentOffset.y + topItems >= contentSize.height - paddingToBottom) {
      loadMoreProducts();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SelectModelModal isVisible={isModelOpen} setIsVisible={setIsModelOpen} />
      <View style={styles.header}>
        <Image source={require('@/assets/images/home/user.png')} style={styles.profileImage} />
        <View style={{
          marginLeft: 8
        }}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.userName}>{!data?.name ? 'Guest' : data.name}</Text>
          {isSeller ? (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              paddingVertical: 5, 
              paddingHorizontal: 10, 
              borderRadius: 15, 
              backgroundColor: '#F6A70D',
              alignSelf: 'flex-start'
            }}>
              <Ionicons name="business" size={12} color="#fff" style={{ marginRight: 5 }} />
              <Text style={{ color: '#fff', fontWeight: 'medium',  fontSize: 10 }}>Seller</Text>
            </View>
          ) : (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              paddingVertical: 5, 
              paddingHorizontal: 10, 
              borderRadius: 15, 
              backgroundColor: '#007AFF',
              alignSelf: 'flex-start' 
            }}>
              <Ionicons name="person" size={12} color="#fff" style={{ marginRight: 5 }} />
              <Text style={{ color: '#fff', fontWeight: 'medium', fontSize: 10 }}>Buyer</Text>
            </View>
          )}
        </View>
        <View style={styles.headerIcons}>
        {isSeller ? (
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} onPress={()=> router.push('/(innerApp)/profile/my-shop')}>
            <Ionicons name="storefront" size={24} color="#8F919C" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Ionicons name="heart" size={24} color="#8F919C" style={styles.headerIcon} />
          </TouchableOpacity>
        )}
          <TouchableOpacity onPress={() => setIsNotificationOpen(!isNotificationOpen)}>
            <Ionicons name="notifications" size={24} color="#8F919C" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={400}  
      >
        {data?.is_verify === false && (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            padding: 16,
          }}>
            <View style={{
              backgroundColor: '#1F243A',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}>
              <Text style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'left',
              }}>
                Your account is not verified. Click the link to verify.{' '}
                {isVerifyLoading ? (
                  <ActivityIndicator color="#FFFFFF" size={'small'} />
                ) : (
                  <Text
                    onPress={handleVerify}
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    Click here
                  </Text>
                )}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
        </View>

        <Swiper style={styles.swiper} showsPagination={true} autoplayTimeout={3}>
          <View style={styles.specialOffer}>
            <HotDealsCard 
              title="Free Maintenance Package" 
              subtitle="Get a free maintenance package with every purchase." 
              backgroundColor="#f0f0f0"
              iconUri={''}
              onButtonPress={() => alert('View button pressed')}
            />
          </View>
          <View style={styles.specialOffer}>
            <HotDealsCard 
              title="Premium Engine Oil Filters Sale" 
              subtitle="Keep your engine running smoothly. Now available at 30% off." 
              backgroundColor="#F9F9A2"
              iconUri={''}
              onButtonPress={() => alert('View button pressed')}
            />
          </View>
          <View style={styles.specialOffer}>
            <HotDealsCard 
                title="Buy One Get One Free!" 
                subtitle="Special offer on selected car models. Limited time only!" 
                backgroundColor="#BAE3F4"
                iconUri={''}
                onButtonPress={() => alert('View button pressed')}
              />
          </View>
        </Swiper>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <Ionicons name="filter" size={20} color="#ccc" style={styles.filterIcon} />
          <TextInput placeholder="Search" style={styles.searchBox} onFocus={() => router.push('/explore')} />
        </View>

{/* 
        <View style={{
          marginTop: 20
        }}>
          <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Brands</Text>
          <Text style={{fontSize: 12, paddingRight: 8, color: '#1D6AFF'}}>See all</Text>
          </View>
          <HorizontalSlide 
            data={reducedData} 
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </View> */}

        <View style={{
          marginTop: 20
        }}>
          <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {marginBottom: 16}]}>Categories</Text>
          </View>
          <CategoriesDisplay
           selectedCategories={selectedCategories}
           setSelectedCategories={setSelectedCategories}
           categories={categories}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {marginTop: 15}]}>Products</Text>
        </View>

        <View>
          {isProductLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{
              marginVertical: 20,
            }} />
          ) : products.length === 0 && !isProductSearching ? (
            <View style={{
              marginHorizontal: 20,
              paddingBottom: 20
            }}>
              <Text style={{
                fontSize: 20
              }}>No products found</Text>
            </View>
          ) : (
            <FlatList
              data={products}
              renderItem={renderCarPartItem}
              keyExtractor={(item, index) => `${item.genericArticleId}-${index}`}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.carPartList}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : null
              }
            />
          )}
        </View>

      </ScrollView>

      {isSeller && (
        <TouchableOpacity style={styles.addButton} onPress={() => setIsListing(!isListing)}>
        {/* <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add-product')}> */}
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}

      {isNotificationOpen && <NotificationPopover onClose={() => setIsNotificationOpen(false)} />}

      <SearchProductToList 
        isVisible={isListing}
        setIsVisible={setIsListing}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVerifyErrorModal}
        onRequestClose={() => setIsVerifyErrorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="close-circle" size={50} color="red" style={styles.modalIcon} />
            <Text style={styles.modalMessage}>{verifyErrorModalMessage}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsVerifyErrorModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F243A',
  },
  scrollView: {
    backgroundColor: '#F5F8FF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 8,
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    padding: 20,
    backgroundColor: '#1F243A',
    zIndex: 10,
    // position: 'absolute',
    // top: 50, // Adjust this value as needed
    left: 0,
    right: 0,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#333',
    zIndex: 20, // Ensure the title is above other content
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 13,
    color: 'white',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  headerIcon: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#EAE9E5",
    justifyContent: 'center',
    marginHorizontal: 20
  },
  searchIcon: {
    marginRight: 10,
  },
  filterIcon: {
    right: 10,
    position: 'absolute',
  },
  searchBox: {
    flex: 1,
    color: '#ccc',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#1D6AFF',
  },
  swiper: {
    height: 130,
  },
  specialOffer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    position: 'relative',
  },
  offerContent: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  offerDescription: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  brandList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  brandItem: {
    alignItems: 'center',
    marginBottom: 15,
    width: (width - 60) / 4, // 4 columns with spacing
  },
  brandIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  brandName: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  chevronButton: {
    paddingHorizontal: 10,
  },
  dealsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dealButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  dealButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  carParts: {
    display: 'flex',
  },
  carPartList: {
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  carPartItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    width: (width - 60) / 2, // 2 columns with spacing
  },
  carPartImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  carPartContent: {
    padding: 10,
  },
  carPartName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  carPartRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  carPartCondition: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  carPartPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  item: {
    flex: 1,
    marginHorizontal: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1D6AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
});

const Home = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
};

export default Home;
