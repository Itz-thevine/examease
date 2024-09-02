import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const SCROLL_AMOUNT = width * 0.5; // Adjust scroll amount as needed

type CarPart = {
id: string;
name: string;
image: string;
price: string;
rating: number;
condition: string;
};

type Brand = {
id: string;
name: string;
icon: keyof typeof Ionicons.glyphMap;
};

const carParts: CarPart[] = [
{
id: '1',
name: 'Sedan Series',
price: '$190,000',
image: 'https://eadn-wc03-5191752.nxedge.io/wp-content/uploads/CarEngine2.jpg.webp',
rating: 4.9,
condition: 'New'
},
{
id: '2',
name: 'McLaren Supercar',
price: '$133,000',
image: 'https://www.nairaland.com/attachments/5182963_engine_jpeg603ad875b7c0f10cc53330c247513a85',
rating: 4.3,
condition: 'Used'
},
{
id: '3',
name: 'Bugatti Sports',
price: '$185,000',
image: 'https://www.nairaland.com/attachments/5182963_engine_jpeg603ad875b7c0f10cc53330c247513a85',
rating: 4.5,
condition: 'Used'
},
{
id: '4',
name: 'F-Type Jaguar',
price: '$167,000',
image: 'https://eadn-wc03-5191752.nxedge.io/wp-content/uploads/CarEngine2.jpg.webp',
rating: 4.6,
condition: 'New'
},
{
id: '5',
name: 'BMW Series',
price: '$170,000',
image: 'https://eadn-wc03-5191752.nxedge.io/wp-content/uploads/CarEngine2.jpg.webp',
rating: 4.7,
condition: 'New'
},
{
id: '6',
name: 'Classic Frog',
price: '$155,000',
image: 'https://www.nairaland.com/attachments/5182963_engine_jpeg603ad875b7c0f10cc53330c247513a85',
rating: 4.5,
condition: 'New'
},
];

const brands: Brand[] = [
{ id: '1', name: 'Mercedes', icon: 'car-sport' },
{ id: '2', name: 'Tesla', icon: 'car-sport' },
{ id: '3', name: 'BMW', icon: 'car-sport' },
{ id: '4', name: 'Toyota', icon: 'car-sport' },
{ id: '5', name: 'Volvo', icon: 'car-sport' },
{ id: '6', name: 'Bugatti', icon: 'car-sport' },
{ id: '7', name: 'Honda', icon: 'car-sport' },
{ id: '8', name: 'Bentley', icon: 'car-sport' },
];

export default function HomeScreen() {
const scrollViewRef = useRef<ScrollView>(null);
const router= useRouter()

const scrollLeft = () => {
scrollViewRef.current?.scrollTo({ x: -(SCROLL_AMOUNT), animated: true });
};

const scrollRight = () => {
scrollViewRef.current?.scrollTo({ x: (SCROLL_AMOUNT), animated: true });
};

const renderCarPartItem = ({ item }: { item: CarPart }) => (
<View style={styles.carPartItem}>
<Image source={{ uri: item.image }} style={styles.carPartImage} />
<View style={styles.carPartContent}>
<Text style={styles.carPartName}>{item.name}</Text>
<View style={styles.carPartRating}>
<Ionicons name="star" size={14} color="#FFD700" />
<Text>{item.rating}</Text>
<Text style={styles.carPartCondition}>{item.condition}</Text>
</View>
<Text style={styles.carPartPrice}>{item.price}</Text>
</View>
<Ionicons name="heart-outline" size={24} color="black" style={styles.favoriteIcon} />
</View>
);

const renderBrandItem = ({ item }: { item: Brand }) => (
<View style={styles.brandItem}>
<Ionicons name={item.icon} size={40} color="#000" style={styles.brandIcon} />
<Text style={styles.brandName}>{item.name}</Text>
</View>
);

return (
<View style={styles.container}>
<View style={{width: '100%', backgroundColor: 'white', paddingTop: 40, paddingLeft: 20}}>
<Text style={styles.pageTitle}>Home</Text>
</View>
<View style={styles.header}>
<Image source={require('@/assets/images/home/user.png')} style={styles.profileImage} />
<View>
<Text style={styles.greeting}>Good Morning 👋</Text>
<Text style={styles.userName}>Aboki Yusuf</Text>
</View>
<View style={styles.headerIcons}>
<Ionicons name="heart-outline" size={24} color="black" style={styles.headerIcon} />
<Ionicons name="notifications-outline" size={24} color="black" style={styles.headerIcon} />
</View>
</View>
<ScrollView style={styles.scrollView}>
<View style={styles.sectionHeader}>
<Text style={styles.sectionTitle}>Special Offers</Text>
<TouchableOpacity>
<Text style={styles.seeAll}>See All</Text>
</TouchableOpacity>
</View>

  <Swiper style={styles.swiper} showsPagination={true} autoplay={true} autoplayTimeout={3}>
    <View style={styles.specialOffer}>
      <Image source={{ uri: 'https://www.shutterstock.com/image-photo/modern-luxury-car-closeup-banner-260nw-306053651.jpg' }} style={styles.offerImage} />
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>20% Week Deals!</Text>
        <Text style={styles.offerDescription}>Get a new tire discount, only valid this week.</Text>
      </View>
    </View>
    <View style={styles.specialOffer}>
      <Image source={{ uri: 'https://www.shutterstock.com/image-photo/car-maintenance-service-engine-oil-260nw-2074528060.jpg' }} style={styles.offerImage} />
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>Premium Engine Oil Filters Sale</Text>
        <Text style={styles.offerDescription}>Keep your engine running smoothly. Now available at 30% off.</Text>
      </View>
    </View>
    <View style={styles.specialOffer}>
      <Image source={{ uri: 'https://www.shutterstock.com/image-photo/details-car-engine-modification-blue-260nw-1636842736.jpg' }} style={styles.offerImage} />
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>Buy One Get One Free!</Text>
        <Text style={styles.offerDescription}>Special offer on selected car models. Limited time only!</Text>
      </View>
    </View>
    <View style={styles.specialOffer}>
      <Image source={{ uri: 'https://www.shutterstock.com/image-photo/mechanic-new-car-headlight-workshop-260nw-2255861175.jpg' }} style={styles.offerImage} />
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>Free Maintenance Package</Text>
        <Text style={styles.offerDescription}>Get a free maintenance package with every purchase.</Text>
      </View>
    </View>
  </Swiper>

  <View style={styles.searchContainer}>
    <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
    <Ionicons name="filter" size={20} color="#ccc" style={styles.filterIcon} />
    <TextInput placeholder="Search" style={styles.searchBox} onFocus={()=> router.push('./explore')}/>
  </View>

  <FlatList
    data={brands}
    renderItem={renderBrandItem}
    keyExtractor={(item) => item.id}
    numColumns={4}
    columnWrapperStyle={styles.columnWrapper}
    contentContainerStyle={styles.brandList}
  />

    <FlatList
      data={carParts}
      renderItem={renderCarPartItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.carPartList}
    />
  </ScrollView>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#f5f5f5'
},
scrollView: {
// paddingTop: 150, // To prevent content being hidden behind the sticky header
},
header: {
flexDirection: 'row',
alignItems: 'center',
padding: 20,
backgroundColor: '#fff',
zIndex: 10,
// position: 'absolute',
// top: 50, // Adjust this value as needed
left: 0,
right: 0,
},
pageTitle: {
fontSize: 24,
fontWeight: 'bold',
color: '#333',
zIndex: 20, // Ensure the title is above other content
},
profileImage: {
width: 50,
height: 50,
borderRadius: 25,
},
greeting: {
fontSize: 18,
color: '#333',
marginLeft: 10,
},
userName: {
fontSize: 18,
fontWeight: 'bold',
color: '#333',
marginLeft: 5,
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
backgroundColor: '#fff',
marginHorizontal: 20,
padding: 10,
borderRadius: 8,
marginTop: 10,
},
searchIcon: {
marginRight: 10,
},
filterIcon: {
right: 10,
position: 'absolute'
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
fontSize: 18,
fontWeight: 'bold',
color: '#333',
},
seeAll: {
fontSize: 14,
color: '#00c7b1',
},
swiper: {
height: 250,
},
specialOffer: {
backgroundColor: '#fff',
marginHorizontal: 20,
borderRadius: 8,
alignItems: 'center',
position: 'relative',
},
offerImage: {
width: '100%',
height: '100%',
borderRadius: 8,
objectFit: 'cover',
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
paddingVertical: 20
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
carParts:{
display: 'flex'
},
carPartList: {
paddingHorizontal: 20,
},
columnWrapper: {
justifyContent: 'space-between',
marginVertical: 6
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
})