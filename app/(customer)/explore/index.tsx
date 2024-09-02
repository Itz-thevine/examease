import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Image, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { combineStyles, height, width } from '@/lib';
import { GlobalStyles } from '@/styles';
import CustomerAppHeader from '@/components/shared/customers-app-header';
import SearchBar from '@/components/app/customer/search-bar';
import CustomModal from '@/components/shared/custom-modal';
import { productsItem } from '@/types';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoriesAndRelatedProducts from '@/components/app/explore/categories-and-related-products';
import ProductCard from '@/components/app/customer/product-card';
import Marquee from '@/components/shared/marquee';
import { MarqueeImages } from '@/static';
import Filter from '@/components/shared/filter';
import Sort from '@/components/shared/sort';
import RelatedProductsWrapper from '@/components/app/explore/related-products';


const ExploreScreen: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('car');
  const [make, setMake] = useState('Select Make');
  const [model, setModel] = useState('Select Model');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [currentDisplay, setcurrentDisplay] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSortValue, setSelectedSortValue] = useState<string | null>(null);


  const brands = ['Mercedes', 'BMW', 'Nissan', 'Fiat', 'Mazda', 'Hyundai', 'Audi', 'Alfa Romeo', 'Kia', 'Ford', 'Opel'];
  const sortValues = ['Price: Low to High', 'Price: High to Low'];

  const handleSelect = (brand: string) => {
    setSelectedBrand(brand);
  };


  const handlePress = (category: string) => {
    setOpenCategory(prev => (prev === category ? null : category));
  };

  const renderInventoryItem = ({ item }: { item: productsItem }) => (
    <ProductCard item={item}/>
  );

  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'safeArea')}>

      
      <CustomModal
        isVisible={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        height={height * 0.7}
        title='Filter'
      >
        <ScrollView style={combineStyles(GlobalStyles, 'padding_xs')}>
          <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_medium')}>Price</Text>
          <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
            
              <View style={combineStyles(GlobalStyles, 'flex_row', 'margin_t_xs', 'gap_sm', 'jusify_between', 'margin_b_sm')}>
                <View style={[combineStyles(GlobalStyles, 'flex_row', 'border_xs', 'padding_xs', 'rounded_full', 'border_soft_gray'), {width: '48%'}]}>
                  <Text style={[combineStyles(GlobalStyles, 'color_gray'), {marginTop: 5}]}>From</Text>
                  <TextInput
                    style={combineStyles(GlobalStyles, 'text_sm', 'margin_l_xs')}
                    value={quantity}
                    onChangeText={setQuantity}
                  />
                </View>

                <View style={[combineStyles(GlobalStyles, 'flex_row', 'border_xs', 'padding_xs', 'rounded_full', 'border_soft_gray'), {width: '48%'}]}>
                  <Text style={[combineStyles(GlobalStyles, 'color_gray'),  {marginTop: 5}]}>to</Text>
                  <TextInput
                    style={combineStyles(GlobalStyles, 'margin_l_xs')}
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
              </View>

              <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_medium', 'margin_b_sm')}>Brand</Text>
                {brands.map((brand, index) => (
                  <TouchableOpacity 
                    style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'margin_b_xs')}
                    onPress={() => handleSelect(brand)} 
                    key={index}
                  >
                    <View style={[combineStyles(GlobalStyles, "border_xs", 'rounded_full', 'border_gray', 'items_center', 'jusify_center'), {height: 20, width: 20}]}>
                      <View style={ selectedBrand === brand && [combineStyles(GlobalStyles, 'background_dark_blue', 'rounded_full'), {width: 12, height: 12}]}></View>
                    </View>
                    <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_l_sm')}>{brand}</Text>
                  </TouchableOpacity>
                ))}
              </View>

          </View>
          <View style={{width: "100%", height: 100}}></View>
        </ScrollView>
        <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm' )}>
          <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')} onPress={() => {
             setcurrentDisplay(1)
            setIsFilterModalOpen(false)
            
            }}>
            <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Apply</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
      <CustomModal
        isVisible={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        height={350}
        title='Sort'
      >
        <ScrollView style={combineStyles(GlobalStyles, 'padding_sm')}>
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_medium', 'margin_b_sm')}>Sort By</Text>
                {sortValues.map((sortValue, index) => (
                  <TouchableOpacity 
                    style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'margin_b_xs')}
                    onPress={() => setSelectedSortValue(sortValue)} 
                    key={index}
                  >
                    <View style={[combineStyles(GlobalStyles, "border_xs", 'rounded_full', 'border_gray', 'items_center', 'jusify_center'), {height: 20, width: 20}]}>
                      <View style={ selectedSortValue === sortValue && [combineStyles(GlobalStyles, 'background_dark_blue', 'rounded_full'), {width: 12, height: 12}]}></View>
                    </View>
                    <Text style={combineStyles(GlobalStyles, 'color_gray', 'margin_l_sm')}>{sortValue}</Text>
                  </TouchableOpacity>
                ))}
              </View>

        </ScrollView>
        <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm' )}>
          <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')} onPress={() => {
            setIsSortModalOpen(false)
            setcurrentDisplay(2)
          }}>
            <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Apply</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>

      <CustomerAppHeader />
      <ScrollView style={combineStyles(GlobalStyles, 'background_softer_blue')}>
        <View style={combineStyles(GlobalStyles, 'background_dark_blue', 'margin_b_sm')}>
          <SearchBar />
         
          <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm', 'margin_sm', 'rounded_xs')}>
            <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
              <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
                <MCIIcon name="car-side" size={24} color={"blue"}/>
                <Text style={combineStyles(GlobalStyles, 'text_2xl', 'font_bold' ,'margin_l_xs')}>Mercedes</Text>
              </View>
              <TouchableOpacity>
                <Image
                    source={require('../../../assets/images/seller/rect1499.png')}
                    style={[{ width: 20, height: 20 }]}
                    resizeMode='contain'
                />  
              </TouchableOpacity>
            </View>
            <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'text_lg')}>S-Class 2.0 CDTI DIESEL</Text>
            <Text style={combineStyles(GlobalStyles, 'margin_t_xs')}>(165 HP / 121 KW, YEAR FROM 2013 - 2023)</Text>
          </View>
        </View>

        <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between', 'margin_sm', 'margin_b_sm')}>
          <Filter onPress={() => setIsFilterModalOpen(true)}/>
          <Sort onPress={() => setIsSortModalOpen(true)}/>
        </View>

        <View style={combineStyles(GlobalStyles, 'safeArea', 'jusify_center', 'items_center', )}>
          <Marquee images={MarqueeImages} />
        </View>

        {
          currentDisplay === 1 ? (
            <CategoriesAndRelatedProducts 
              openCategory={openCategory}
              handlePress={handlePress}
              renderInventoryItem={renderInventoryItem}
            />
          ): 
          (
            <RelatedProductsWrapper 
              openCategory={openCategory}
              handlePress={handlePress}
              renderInventoryItem={renderInventoryItem}
            />
          )
        }


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Other styles...
});

export default ExploreScreen;
