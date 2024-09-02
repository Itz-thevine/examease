import React, { useState, useMemo } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import CustomerAppHeader from '@/components/shared/customers-app-header';
import ProgressBar from '@/components/shared/progress-bar';
import CartSummary from '@/components/app/customer/cart-summary';
import CartAddressSummary from '@/components/app/customer/cart-address-summary';
import PaymentMethod from '@/components/app/customer/cart-payment-summary';
import CartConfirmation from '@/components/app/customer/cart-confirmation';
import ProductCard2 from '@/components/app/customer/product-card-2';
import ProductCard3 from '@/components/app/customer/product-card-3';
import { combineStyles, height } from '@/lib';
import { RelatedProducts } from '@/static';
import { GlobalStyles } from '@/styles';
import CustomModal from '@/components/shared/custom-modal';
import { router } from 'expo-router';

const CartScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const steps = ['Cart', 'Delivery', 'Payment', 'Confirm'];
  

  const moveNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const movePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const [cartItems, setCartItems] = useState([
    { id: '1', image: require('@/assets/images/Group 41.png'), brand: 'Total Energies', title: 'QUARTZ INEO FIRST 0W-30', price: 25, quantity: 1 },
    { id: '2', image: require('@/assets/images/Group 41.png'), brand: 'Mobil', title: 'QUARTZ INEO FIRST 0W-30', price: 26, quantity: 1 },
  ]);

  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  const renderCartItem = ({ item }: { item: any }) => <ProductCard3 item={item} />;

  const renderRelatedProduct = ({ item }: { item: any }) => <ProductCard2 item={item} />;

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item))
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CartSummary
            cartItems={cartItems}
            renderCartItem={renderCartItem}
            RelatedProducts={RelatedProducts}
            renderRelatedProduct={renderRelatedProduct}
            totalAmount={total.toString()}
            moveNext={moveNext}
          />
        );
      case 1:
        return <CartAddressSummary moveNext={moveNext} />;
      case 2:
        return <PaymentMethod moveNext={moveNext} />;
      case 3:
        return <CartConfirmation moveNext={() => setIsConfirmationModalOpen(true)} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'safeArea')}>
        <CustomModal
        isVisible={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        height={height}
        contentBackground={'transparent'}
        hasCloseBtn={false}
      >
        <View style={combineStyles(GlobalStyles, 'padding_sm', 'items_center', 'jusify_center', 'safeArea')}>
            <Image
                source={require('@/assets/images/success.png')}
                style={[{width: 180, height: 180}, GlobalStyles.margin_sm]}
                resizeMode="contain"
            />
            <Text style={[combineStyles(GlobalStyles, 'text_5xl', 'font_medium', 'color_white', 'text_center', 'line_5xl', 'margin_b_sm', 'margin_t_sm'), {width: 300}]}>Your order is Successfully Placed!</Text>
            
           
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_royal_blue', 'padding_y_sm', 'rounded_full', 'items_center'), {width: 300, marginTop: 100}]} onPress={() =>{
                  router.push('/orders')
                  setIsConfirmationModalOpen(false)
                }}>
                    <Text style={combineStyles(GlobalStyles, 'color_white', 'font_medium')}>Track your Order</Text>
                </TouchableOpacity>
            </View>
          
        </View>
      </CustomModal>
      <CustomerAppHeader />
      <ProgressBar currentStep={currentStep} steps={steps} moveNext={moveNext} movePrevious={movePrevious} />
      {renderCurrentStep()}
    </SafeAreaView>
  );
};

export default CartScreen;
