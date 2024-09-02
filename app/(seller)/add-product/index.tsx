import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useProducts } from '@/hooks/app/useProducts';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { DynamicObject } from '@/types';
import { useBrands } from '@/hooks/app/useBrand';
import { useAuth } from '@/context/auth';
import CategoryComponent from '@/components/app/listProducts/addCaetgories';
import { useFetchCompatibility } from '@/hooks/app/useFetchCompatibility';
import CompatibilityComp from '@/components/app/listProducts/compatibility';

const { width } = Dimensions.get('window');

interface ImageDetails {
  uri: string;
  width: number;
  height: number;
  type: string | undefined;
}

const ProductListing = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { data: userDetails, isLoading } = useQuery({
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

  const [product, setProduct] = useState<DynamicObject>({});
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [engine, setEngine] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [mainImage, setMainImage] = useState<ImageDetails | null>(null);
  const [additionalImages, setAdditionalImages] = useState<ImageDetails[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean | ''>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean | ''>(false);

  const { data } = useProducts({
    searchQuery: product?.Description,
    genericArticleId: product?.genericArticleId,
    perPage: 1,
    includeAll: true
  });
  const fetchedProduct = data?.pages[0]?.articles[0];

  const { data: fetchBrand } = useBrands();
  const brands = fetchBrand?.counts || [];

  const {data: fetchCompatibility} = useFetchCompatibility({
    articleId : fetchedProduct?.genericArticles[0]?.legacyArticleId
  })

  console.log(fetchCompatibility)

  useEffect(() => {
    AsyncStorage.getItem('product:88333').then((value) => {
      const fetchedValue = JSON.parse(value ?? '');
      setProduct(fetchedValue);
      AsyncStorage.removeItem('product:88333');
    });
  }, []);

  useEffect(() => {
    if (fetchedProduct) {
      setTitle(fetchedProduct.genericArticles[0]?.genericArticleDescription || '');
      setBrand(fetchedProduct.mfrName || '');
      setDescription(fetchedProduct.genericArticles[0]?.genericArticleDescription || '');

      if (fetchedProduct.images && fetchedProduct.images.length > 0) {
        setMainImage({
          uri:  fetchedProduct.images[0].imageURL800,
          width: 0,
          height: 0,
          type: 'image',
        });
      }
    }
  }, [fetchedProduct]);

  const pickImage = async (setImage: (image: ImageDetails) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const pickedImage = result.assets[0];
      setImage({
        uri: pickedImage.uri,
        width: pickedImage.width,
        height: pickedImage.height,
        type: pickedImage.type,
      });
    }
  };

  const addAdditionalImage = (image: ImageDetails) => {
    setAdditionalImages([...additionalImages, image]);
  };

  useEffect(() => {
    const isFormValid = title.length > 0 && brand.length > 0 && description.length > 0 && quantity.length > 0 && price.length > 0 ;
    setIsButtonEnabled(isFormValid);
  }, [title, category, brand, vehicle, make, model, engine, description, quantity, price]);


  const handleSubmit = async () => {
    if (!isButtonEnabled) return;
  
    const formData = {
      seller_id: 0,  
      article_number: 0,  
      data_supplier_id: 0,  
      mfr_name: brand,
      generic_article_description: title,
      legacy_article_id: `${product?.legacyArticleId}` || '',
      linkage_target_types: product?.linkageTargetTypes?.join(',') || '',
      gtins: [],  
      trade_numbers: [],  
      oem_numbers: [],   
      images: [mainImage?.uri, ...additionalImages.map(img => img.uri)].filter(Boolean),
      compatabilities: [
        {
          car_id: 0,   
          fuel_type: '',   
          power_hp_from: 0,  
          power_hp_to: 0,  
          power_kw_from: 0,  
          power_kw_to: 0,  
          year_of_constr_from: 0,  
          year_of_constr_to: 0,  
        }
      ],
      criteria: [
        {
          criteria_description: '',  
          criteriaUnitDescription: '', 
          criteria_type: '',  
          formatted_value: ''  
        }
      ]
    };
  
    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/save/save-seller-item/${userDetails?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`
        },
        body: JSON.stringify(formData),
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle network or other errors
    } finally {
      setIsSubmitting(false)
    }
    
  };


  const categories = ['Electronics', 'Furniture'];
  const subCategories = {
    Electronics: ['Phones', 'Computers'],
    Phones: ['Smartphones', 'Feature Phones'],
    Computers: ['Laptops', 'Desktops'],
    Furniture: ['Tables', 'Chairs'],
    Tables: ['Dining Tables', 'Coffee Tables'],
    Chairs: ['Armchairs', 'Stools'],
  };

  const handleButtonPress = (selectedCategories: string[]) => {
    console.log('Selected Categories:', selectedCategories);
  };
  
  

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={16} color="white" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>List Product</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => router.push('/cart')}>
              <Ionicons name="heart" size={20} color="#8F919C" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.pageSubTitle}>List your product</Text>

        <View style={styles.uploadContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setMainImage)}>
            {mainImage ? (
              <Image source={{ uri: mainImage.uri }} style={styles.uploadedImage} />
            ) : (
              <>
                <Ionicons name="image-outline" size={50} color="#ccc" />
                <Text style={styles.uploadText}>Upload Cover Photo</Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.imageRow}>
            {additionalImages.map((image, index) => (
              <Image key={index} source={{ uri: image.uri }} style={styles.uploadedImageSmall} />
            ))}
            {[...Array(4 - additionalImages.length)].map((_, index) => (
              <TouchableOpacity key={index} style={styles.uploadButtonSmall} onPress={() => pickImage(addAdditionalImage)}>
                <Ionicons name="image-outline" size={30} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item Title</Text>
          <View style={styles.searchBox}>
            {/* <Ionicons name="search" size={20} color="#C0C0C7" style={styles.searchIcon} /> */}
            <TextInput 
              // {...props} 
              style={styles.searchTextInput} 
              placeholderTextColor="#C0C0C7"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter Item Title"
            />
          </View>

          <Text style={[styles.label, {
            marginTop: 30
          }]}> Item Description</Text>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchTextInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter Item Description"
              multiline
            />
          </View>

          <Text style={[styles.label, {
            marginTop: 24
          }]}> Brand</Text>
            <View style={[styles.pickerContainer, {
              marginTop: 10
            }]}>
            <Picker
              selectedValue={brand} 
              style={styles.picker}
              onValueChange={setBrand}
            >
              <Picker.Item label="Select brand" value="" />
              {brands.map((brand: DynamicObject) => {
                return (
                  <Picker.Item key={brand.id} label={brand.name} value={brand.name} />
                )
              })}
            </Picker>
          </View>

          <CategoryComponent
            categories={categories}
            subCategories={subCategories}
            buttonText="Submit"
            onButtonPress={handleButtonPress}
          />

        

        </View>

        <Text style={styles.sectionTitle}>Compatibility</Text>
        <View style={[styles.searchBox, {
          marginHorizontal: 20,
        }]}>
          <CompatibilityComp
            sampleData={fetchCompatibility ?? {}}
          />
        </View>

        {/* <View style={styles.pickerContainer}>
          <Text style={styles.label}>Vehicle</Text>
          <Picker selectedValue={vehicle} style={styles.picker} onValueChange={setVehicle}>
            <Picker.Item label="Select Vehicle" value="" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Make</Text>
          <Picker selectedValue={make} style={styles.picker} onValueChange={setMake}>
            <Picker.Item label="Select Make" value="" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Model</Text>
          <Picker selectedValue={model} style={styles.picker} onValueChange={setModel}>
            <Picker.Item label="Select Model" value="" />
          </Picker>
        </View> */}

        {/* <View style={styles.pickerContainer}>
          <Text style={styles.label}>Engine</Text>
          <Picker selectedValue={engine} style={styles.picker} onValueChange={setEngine}>
            <Picker.Item label="Select Engine" value="" />
          </Picker>
        </View> */}

     

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Quantity"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
            keyboardType="numeric"
          />
        </View>

        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>I agree to Tobendo’s Terms & Policy.</Text>
        </View> */}

        <TouchableOpacity style={[styles.submitButton, !isButtonEnabled && styles.disabledButton]} disabled={!isButtonEnabled} onPress={() => handleSubmit()}>
          {
            isSubmitting ? <ActivityIndicator /> : (
              <Text style={styles.submitButtonText}>Add New Inventory</Text>
            )
          }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F243A',
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : 40,
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'white',
    marginLeft: 20,
  },
  pageSubTitle: {
    color: 'black',
    marginHorizontal: 20,
    paddingTop: 20,
    fontSize: 16,
    fontWeight: '700',
  },
  uploadContainer: {
    alignItems: 'center',
    padding: 10,
  },
  uploadButton: {
    width: width - 40,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  uploadText: {
    color: '#ccc',
    marginTop: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
  },
  uploadButtonSmall: {
    width: (width - 80) / 4,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImageSmall: {
    width: (width - 80) / 4,
    height: 80,
    borderRadius: 8,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 32,
    borderWidth: 1,
    // marginHorizontal: 20,
    borderColor: "#EAE9E5",
    justifyContent: 'center'
  },
  searchTextInput: {
    flex: 1,
    paddingLeft: 10,
    color: 'black',
    alignItems: 'center'
  },

  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#EAE9E5",
    justifyContent: 'center',
    overflow:'hidden'
  },
  picker: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    fontSize: 12
  },
  sectionTitle: {
    fontSize: 14,
    textAlign: 'left',
    marginVertical: 10,
    paddingHorizontal: 20,
    marginBottom:20
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});

const ProductListingPage = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ProductListing />
    </QueryClientProvider>
  );
};

export default ProductListingPage;
