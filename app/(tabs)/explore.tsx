import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity,
  Dimensions, FlatList, Platform, Pressable, ActivityIndicator,
  SafeAreaView, TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { CarPart, DynamicObject } from '@/types';
import Autocomplete from 'react-native-autocomplete-input';
import {
  QueryClient, QueryClientProvider, useInfiniteQuery, useQuery, useQueryClient
} from '@tanstack/react-query';
import { height } from '@/lib';
import { useBrands } from '@/hooks/app/useBrand';
import { useModels } from '@/hooks/app/useModel';
import { useEngines } from '@/hooks/app/useEngine';

const { width } = Dimensions.get('window');
let currentPage = 1;

type Brand = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};


const EnrollScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProductSearching, setIsProductSearching] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedEngine, setSelectedEngine] = useState<DynamicObject>({});
  const [searchOptionUp, setSearchOptionUp] = useState<Boolean>(false)
  const [linkageTarget, setLinkageTarget] = useState<'T' | 'V' | 'B' | 'P'>('P');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const isSearchButtonDisabled = !selectedBrand || !selectedModel || !selectedEngine;

  const fetchProducts = async ({ pageParam = 1 }) => {
    const url = new URL(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/part-suggestion-deatils`);
    url.searchParams.append('search_query', `${searchQuery}`);
    // url.searchParams.append('linkage_target_id', `${selectedEngine?.linkageTargetId}`);
    url.searchParams.append('page', `${pageParam}`);
    url.searchParams.append('per_page', `${10}`);
    url.searchParams.append('lang', 'en');
    url.searchParams.append('include_all', `${false}`);
    url.searchParams.append('search_type', `${99}`);

    const res = await fetch(url);
    return res.json();
  };
  


  const {
    data,
    isLoading: isProductLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalArticles = allPages.flatMap(page => page.articles).length;
      return lastPage.totalMatchingArticles > totalArticles ? allPages.length + 1 : undefined;
    }
  });

  const products = data?.pages.flatMap(page => page.articles) || [];

  const { data: { counts: brands } = {} } = useBrands();
  const { data: { modesl } = {}} = useModels(selectedBrand);
  const { data: engines, isLoading: enginesLoading } = useEngines(selectedBrand, selectedModel);
  


  const handleSearchChange = async (query: string) => {
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedEngine({})

    setSearchQuery(query);
    if (query.length >= 3) {
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
    }

    // if(query.length === 0){
    //  setSearchQuery('')
    //   refetch()
    // }
  };

  
  const handleOutsideClick = () => {
    setSearchOptionUp(false);
    Keyboard.dismiss(); 
  };

  const handleSearchSelect = (selectedItem: string) => {
    setSearchQuery(selectedItem);
    setSearchResults([]);
    setSearchOptionUp(false)
  };

  const handleProductSearch = async () => {
    refetch()
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

  const SearchSuggestions = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSearchSelect(item)}>
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  const loadMoreProducts = () => {
    if (!isFetchingNextPage) {
    // if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const height = Platform.select({
    ios: 40,
    android: 800,
    default: 800,
  })

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const paddingToBottom = 20;
    const topItems = 950;
    if (contentOffset.y + topItems >= contentSize.height - paddingToBottom) {
      loadMoreProducts();
    }
    setScrollPosition(contentOffset.y);
  }, [contentHeight]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={16} color="white" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Search</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push('/cart')}>
            <Ionicons name="heart" size={20} color="#8F919C" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >   
        <View style={{
          backgroundColor: '#1F243A'
        }}>
          <TouchableWithoutFeedback onPress={handleOutsideClick}>
            <View style={{ position: 'relative', zIndex: 20 }}>
                <View style={styles.searchContainer}>
                  <Autocomplete
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
                    <View style={{ position: 'absolute', top: 75, width: width }}>
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#1D6AFF" />
                      </View>
                    </View>
                  )}
                {(!isLoading && (searchResults.length === 0) && searchOptionUp) && (
                    <View style={{ position: 'absolute', top: 75, width: width }}>
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
          
          <View style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 20,
            padding: 10
          }}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, selectedTab === 'All' && styles.activeTab]}
                onPress={() => {
                  setSelectedTab('All');
                  setLinkageTarget('P');
                }}
              >
                <Ionicons name="list" size={20} color={selectedTab === 'All' ? '#fff' : '#8F919C'} />
                <Text style={[styles.tabText, selectedTab === 'All' && styles.activeTabText]}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, selectedTab === 'Car' && styles.activeTab]}
                onPress={() => {
                  setSelectedTab('Car');
                  setLinkageTarget('V');
                }}
              >
                <Ionicons name="car-sport" size={24} color={selectedTab === 'Car' ? '#fff' : '#8F919C'} />
                <Text style={[styles.tabText, selectedTab === 'Car' && styles.activeTabText]}>Car</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, selectedTab === 'Motorcycle' && styles.activeTab]}
                onPress={() => {
                  setSelectedTab('Motorcycle');
                  setLinkageTarget('B');
                }}
              >
                <Ionicons name="bicycle" size={24} color={selectedTab === 'Motorcycle' ? '#fff' : '#8F919C'} />
                <Text style={[styles.tabText, selectedTab === 'Motorcycle' && styles.activeTabText]}>Motorcycle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, selectedTab === 'Truck' && styles.activeTab]}
                onPress={() => {
                  setSelectedTab('Truck');
                  setLinkageTarget('T');
                }}
              >
                <Ionicons name="bus" size={24} color={selectedTab === 'Truck' ? '#fff' : '#8F919C'} />
                <Text style={[styles.tabText, selectedTab === 'Truck' && styles.activeTabText]}>Truck</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
              <View style={styles.filter}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedBrand}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setSelectedBrand(itemValue);
                      setSelectedModel('');
                      setSelectedEngine({});
                      queryClient.invalidateQueries({ queryKey: ['models'] });
                    }}
                  >
                    <Picker.Item label="Select brand" value="" />
                    {brands?.map((brand: Brand) => (
                      <Picker.Item key={brand.id} label={brand.name ?? ''} value={brand.id ?? ''} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.filter}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedModel}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setSelectedModel(itemValue);
                      setSelectedEngine({});
                      queryClient.invalidateQueries({ queryKey: ['engines'] });
                    }}
                    enabled={!!selectedBrand}
                  >
                    <Picker.Item label="Select model" value="" />
                    {modesl?.counts?.map((model: any) => (
                      <Picker.Item key={model.id} label={model.name ?? ''} value={model.id ?? ''} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.filter}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedEngine}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      setSelectedEngine(itemValue);
                    }}
                    enabled={!!selectedModel}
                  >
                    <Picker.Item label="Select engine" value="" />
                    {engines?.map((engine: any) => (
                      <Picker.Item key={engine.linkageTargetId} label={engine.description ?? ''} value={engine ?? ''} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </View>

          <Pressable
            style={[styles.searchButton, ((isSearchButtonDisabled || isProductSearching) && searchQuery.length < 1) && styles.searchButtonDisabled]}
            disabled={(isSearchButtonDisabled || isProductSearching) && searchQuery.length < 1}
            onPress={handleProductSearch}
          >
            {isProductSearching ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </Pressable>
        </View> 
           

        <View style={{marginTop: 32}}>
          {isProductLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
          ) : products.length === 0 && !isProductSearching ? (
            <View style={styles.noProductContainer}>
              <Text style={styles.noProductText}>No products found</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F243A',
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : 40,
    justifyContent: 'space-between'
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'white',
    marginLeft: 20,
  },
  searchContainer: {
    marginHorizontal: 20,
    // marginTop: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#33384C',
    padding: 10,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#454A5C",
    justifyContent: 'center'
  },
  searchTextInput: {
    flex: 1,
    paddingLeft: 10,
    color: 'white',
    alignItems: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    borderWidth: 0,
    marginTop: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#F8AB38',
    borderRadius: 32
  },
  tabText: {
    marginLeft: 8,
    color: '#8F919C',
  },
  activeTabText: {
    color: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    marginVertical: 20,
    borderRadius: 8,
  },
  filterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filter: {
    marginVertical: 10,
  },
  filterLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 32,
    overflow: 'hidden',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: 12
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: -25
  },
  searchButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  carPartList: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  carPartItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    width: (width - 60) / 2,
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
  loadingContainer: {
    width: width * 0.92,
    borderRadius: 10,
    backgroundColor: '#33384C',
    marginHorizontal: 'auto',
    padding: 15,
  },
  suggestionsContainer: {
    width: width * 0.92,
    borderRadius: 10,
    backgroundColor: '#33384C',
    marginHorizontal: 'auto',
    padding: 15,
  },
  suggestionList: {
    // Customize your suggestion list style here
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    color: 'white',
  },
  noProductContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noProductText: {
    fontSize: 18,
    color: '#333',
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});

const queryClient = new QueryClient();

const Explore = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EnrollScreen />
    </QueryClientProvider>
  );
};

export default Explore;
