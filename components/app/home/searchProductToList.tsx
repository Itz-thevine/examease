import React, { useCallback, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, TextInput, ActivityIndicator, FlatList, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TobendoButton from '@/components/shared/Button';
import AutocompleteInput from 'react-native-autocomplete-input';
import { useProducts } from '@/hooks/app/useProducts';
import { CarPart, DynamicObject } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { storeData } from '@/lib';

interface iSearchProducts {
    isVisible: boolean,
    setIsVisible: (value : boolean) => void,

}
const { width, height } = Dimensions.get('window');

const SearchProductToList : React.FC<iSearchProducts> = ({ isVisible, setIsVisible }) => {
    const router = useRouter()

    const [isListSelected, setIsListSelected] = useState(false)
    const [searchOptionUp, setSearchOptionUp] = useState<Boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isProductSearching, setIsProductSearching] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<DynamicObject>({})
    


    const {data: fetchProducts,  isFetchingNextPage, fetchNextPage, isLoading: isProductLoading, refetch } = useProducts({
        searchQuery: searchQuery.length > 0 ? searchQuery : undefined
    })

    const products =  fetchProducts?.pages.flatMap(page => page.articles) || []

   
    useEffect(() => {
        refetch()
    }, [searchQuery])


    const handleSearchChange = async (query: string) => {
    
        // setSearchQuery(query);
        if (query.length >= 1) {
          setSearchOptionUp(true)
          setIsLoading(true);
          try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/auto-complete-suggestion/${query}?lang=en`);
            const results = await response.json();
            setSearchResults(results.suggestions);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setSearchResults([]);
          setSearchOptionUp(false)
          setSearchQuery('')
        }

    
      };
    


    const handleOutsideClick = () => {
        setSearchOptionUp(false);
        Keyboard.dismiss(); 
      };

      const SearchSuggestions = ({ item }: { item: string }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSearchSelect(item)}>
          <Text style={styles.suggestionText}>{item}</Text>
        </TouchableOpacity>
      );

        
    const handleSearchSelect = (selectedItem: string) => {
        setSearchQuery(selectedItem);
        setSearchResults([]);
        setSearchOptionUp(false)
    };

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


      const renderCarPartItem = ({ item }: { item: CarPart }) => (
        <TouchableOpacity onPress={() => setSelectedProduct(item)}>
            <View style={[styles.carPartItem, {backgroundColor: item.Description === selectedProduct?.Description ? "#FFF4DE": '#fff' }]}>
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
            </View>
        </TouchableOpacity>
      );

    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            >
                <View 
                    style={styles.scrollView}
                >
                    <View style={[styles.modalOverlay, {zIndex: 2}]}>
                        <View style={styles.modalContent}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                height: 50,
                                paddingVertical: 5 ,
                                marginVertical: 10
                            }}>
                                <TouchableOpacity style={{
                                    width: 25
                                }} onPress={() => setIsVisible(false)}>
                                    <Ionicons name="close-circle" size={25} color="0000ff" style={styles.modalIcon} />
                                </TouchableOpacity>
                                <TobendoButton
                                    text={'Continue'}
                                    buttonStyle={{
                                        backgroundColor:  Object.entries(selectedProduct).length > 0 ? '#1D6AFF' : "#DDDCDC",
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        borderRadius: 30,
                                    }}
                                    textStyle={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 12
                                    }}
                                    onPress={async () =>{
                                        if( Object.entries(selectedProduct).length > 0 ){
                                            storeData("product:88333", selectedProduct)
                                            router.push('/add-product')
                                            setIsVisible(false)
                                        }
                                    }}
                                />
                            </View>

                            <View 
                            style={{
                                // flex: 1
                            }}
                            
                            >
                                <TouchableWithoutFeedback onPress={handleOutsideClick}>
                                    <View style={{ position: 'relative', zIndex: 20 }}>
                                        <View>
                                        <AutocompleteInput
                                            data={searchResults}
                                            defaultValue={searchQuery}
                                            onChangeText={handleSearchChange}
                                            inputContainerStyle={styles.autocompleteContainer}
                                            renderTextInput={(props) => (
                                            <View style={styles.searchBox}>
                                                <Ionicons name="search" size={20} color="#C0C0C7" style={styles.searchIcon} />
                                                <TextInput 
                                                {...props} 
                                                style={styles.searchTextInput} 
                                                placeholder="Search Part Name or Number"
                                                placeholderTextColor="#C0C0C7"
                                                />
                                            </View>
                                            )}
                                            flatListProps={{
                                            keyExtractor: (item, index) => index.toString(),
                                            renderItem: () => null,
                                            }}      
                                        />
                                        </View>
                                        
                                        {(isLoading && searchOptionUp) && (
                                            <View style={{ position: 'absolute', top: 75, left:-20, width: width }}>
                                            <View style={styles.loadingContainer}>
                                                <ActivityIndicator size="small" color="#1D6AFF" />
                                            </View>
                                            </View>
                                        )}
                                        {(!isLoading && (searchResults.length === 0) && searchOptionUp) && (
                                            <View style={{ position: 'absolute', top: 75, left:-20, width: width }}>
                                            <View style={styles.loadingContainer}>
                                                <Text style={styles.pageTitle}>No product found</Text>
                                            </View>
                                            </View>
                                        )}
                                        {(searchResults.length > 0 && searchOptionUp) && (
                                        <View style={{ position: 'absolute', top: 75, width: width }}>
                                            <View style={styles.suggestionsContainer}>
                                            <FlatList
                                                data={searchResults}
                                                renderItem={SearchSuggestions}
                                                keyExtractor={(item) => item}
                                                numColumns={1}
                                                contentContainerStyle={styles.suggestionList}
                                            />
                                            </View>
                                        </View>
                                        )}
                                    </View>
                                </TouchableWithoutFeedback>                                
                            </View>     

                        </View>
                    </View>

                    <ScrollView 
                    style={{
                        zIndex: 1,
                        marginTop: 150,
                        height: height * 0.78
                    }}
                    onScroll={handleScroll}
                    scrollEventThrottle={400} 
                    >
                    {isProductLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" style={{
                        marginVertical: 20,
                        }} />
                    ) : products.length === 0 && !isProductSearching ? (
                        <View >
                        <Text>No products found</Text>
                        </View>
                    ) : (
                        <FlatList
                        data={products}
                        renderItem={renderCarPartItem}
                        keyExtractor={(item, index) => `${item.genericArticleId}-${index}`}
                        numColumns={1}
                        // columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={{
                            paddingHorizontal: 20
                        }}
                        ListFooterComponent={
                            isFetchingNextPage ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                            ) : null
                        }
                        />
                    )}
                    </ScrollView>

                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: width,
    
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  autocompleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#EAE9E5",
    justifyContent: 'center',
    padding: 10,
    height: 45,
    marginTop: 13
  },
  searchBox: {
    flex: 1,
    color: '#ccc',
  },
  searchTextInput: {
    flex: 1,
    paddingLeft: 10,
    color: 'black',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    right: 8,
    top: 2,
  },
  loadingContainer: {
    width: width * 0.92,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 'auto',
    borderColor: "#EAE9E5",
    padding: 15,
  },
  suggestionsContainer: {
    width: width * 0.92,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 'auto',
    borderColor: "#EAE9E5",
    borderWidth: 1,
    padding: 15,
    zIndex: 20,
    position: 'absolute'
  },
  suggestionList: {
    // Customize your suggestion list style here
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    color: 'black',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'black',
    marginLeft: 10,
  },
  scrollView: {
    backgroundColor: '#F5F8FF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 8,
    paddingBottom: 150,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 6,
  },  
  carPartItem: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    flexDirection: 'row'
  },
  carPartImage: {
    width: '30%',
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
    width: "80%",
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
});

export default SearchProductToList;
