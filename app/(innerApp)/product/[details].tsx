import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const { width } = Dimensions.get('window');

const SingleProductPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={30} color="white" />
        <Ionicons name="cart" size={30} color="white" />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
        <TextInput placeholder="Search Part Name or Number" style={styles.searchBox} />
      </View>

      <View style={styles.vehicleInfo}>
        <Ionicons name="car" size={40} color="#333" />
        <View>
          <Text style={styles.vehicleText}>Mercedes</Text>
          <Text style={styles.vehicleDetails}>S-Class 2.0 CDTI DIESEL</Text>
          <Text style={styles.vehicleDetails}>(165 HP / 121 KW, YEAR FROM 2013 - 2023)</Text>
        </View>
        <Ionicons name="pencil" size={24} color="#333" style={styles.editIcon} />
      </View>

      <Text style={styles.compatibilityText}>This Product is compatible with your vehicle!</Text>

      <View style={styles.productImageContainer}>
        <Image source={{ uri: 'https://example.com/product-image.jpg' }} style={styles.productImage} />
      </View>

      <View style={styles.productDetails}>
        <Text style={styles.productBrand}>Total Energies</Text>
        <Text style={styles.productTitle}>QUARTZ INEO FIRST 0W-30</Text>
        <Text style={styles.productSubtitle}>5 L - ref. 214178 - Engine oil</Text>
        <Text style={styles.productDelivery}>Delivery: Sat 1 May</Text>
        <View style={styles.productDetailList}>
          {["Point: Product Detail", "Point: Product Detail", "Point: Product Detail"].map((detail, index) => (
            <View key={index} style={styles.productDetailItem}>
              <Text>{detail}</Text>
              <Text style={styles.detailLink}>Details</Text>
            </View>
          ))}
        </View>
        <Button title="More" onPress={() => {}} />
      </View>

      <View style={styles.productDescription}>
        <Text style={styles.descriptionTitle}>Product Description</Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Get in Touch</Text>
      </TouchableOpacity>

      <View style={styles.relatedProducts}>
        <Text style={styles.relatedTitle}>You Might Also Like</Text>
        <ScrollView horizontal>
          {["https://example.com/related-product1.jpg", "https://example.com/related-product2.jpg"].map((image, index) => (
            <View key={index} style={styles.relatedProduct}>
              <Image source={{ uri: image }} style={styles.relatedProductImage} />
              <Text>Product Name</Text>
              <Text>$13.00</Text>
              <Button title="Add to Cart" onPress={() => {}} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.reportButtonContainer}>
        <Button title="Report Product" onPress={() => {}} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>$13.00</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityButton}>-</Text>
          <Text style={styles.quantityText}>1</Text>
          <Text style={styles.quantityButton}>+</Text>
        </View>
        <Button title="Add to Cart" onPress={() => {}} />
        <Button title="Buy Now" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1a1a1a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    color: '#333',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
  },
  vehicleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vehicleDetails: {
    fontSize: 14,
    color: '#666',
  },
  editIcon: {
    marginLeft: 'auto',
  },
  compatibilityText: {
    textAlign: 'center',
    color: '#00c853',
    marginVertical: 10,
  },
  productImageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  productImage: {
    width: width - 40,
    height: width - 40,
    resizeMode: 'contain',
  },
  productDetails: {
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
  },
  productBrand: {
    fontSize: 16,
    color: '#333',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  productDelivery: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  productDetailList: {
    marginVertical: 10,
  },
  productDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLink: {
    color: '#007BFF',
  },
  productDescription: {
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  contactButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ff6f00',
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  relatedProducts: {
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  relatedProduct: {
    alignItems: 'center',
    marginRight: 10,
  },
  relatedProductImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  reportButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SingleProductPage;
