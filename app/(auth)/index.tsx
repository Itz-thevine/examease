import React, { useState } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { combineStyles, width } from '@/lib';
import { GlobalStyles } from '@/styles';
import { router, useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const steps = [
  { number: '1', title: 'Log in to personalized portal!', message: 'Full access to adjust all of your data.' },
  { number: '2', title: 'Start Your Preparation!', message: 'Create a study plan tailored to your exam schedule.' },
  { number: '3', title: 'Track Your Progress!', message: 'Monitor your preparation with personalized analytics and insights.' },
];

const faqs = [
  { question: 'How does it work?', answer: 'Simply sign up, enter examination details, and get personalized study plan.' },
  { question: 'Can I track my progress?', answer: 'Yes, we offers real-time progress tracking to keep you on track.' },
  { question: 'Is there a cost?', answer: 'We offer free plans for suit different needs.' },
];

const OnboardingScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const router = useRouter()

  const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
     router.push('/(seller)/seller')
    }

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <ScrollView style={combineStyles(GlobalStyles, 'background_softer_blue')}>
        <ImageBackground
          source={require('@/assets/images/onboarding/onboarding.png')}
          style={[GlobalStyles.margin_t_sm, styles.header]}
          resizeMode="cover"
        >
          <Image
            source={require('@/assets/images/mainLogo-white.png')}
            style={[GlobalStyles.logo, GlobalStyles.margin_sm]}
            resizeMode="contain"
          />
          <View style={[GlobalStyles.padding_sm]}>
            <View style={GlobalStyles.margin_b_sm}>
              <Text style={[combineStyles(GlobalStyles, 'font_lighter', 'text_5xl', 'color_white')]}>
                Welcome to <Text style={GlobalStyles.font_bold}>ExamEase</Text>
              </Text>
              <Text style={[combineStyles(GlobalStyles, 'font_lighter', 'text_5xl', 'color_white')]}> Your Exam Preparation Hub!</Text>
            </View>
            <Text style={[combineStyles(GlobalStyles, 'font_lighter', 'color_white', 'margin_t_sm', 'line_lg'), { width: 250 }]}>
              Get ready for your exams with <Text style={GlobalStyles.font_bold}>ExamEase</Text>, where preparation meets success!
            </Text>
          </View>
        </ImageBackground>
        <View style={[GlobalStyles.container, {}]}>
          <View style={GlobalStyles.padding_xs}>
            {steps.map((step, index) => (
              <View
                style={combineStyles(GlobalStyles, 'flex_row', 'margin_b_sm', 'items_center')}
                key={index}
              >
                <Text
                  style={combineStyles(GlobalStyles, 'text_5xl', 'color_royal_blue', 'font_bold', 'margin_r_xs', 'text_italic', 'background_soft_blue', 'padding_x_sm', 'padding_y_xs', 'rounded_full'
                  )}
                >
                  {`${step.number} `}
                </Text>
                <View>
                  <Text style={combineStyles(GlobalStyles, 'font_medium', 'text_2xl')}>{step.title}</Text>
                  <Text style={[combineStyles(GlobalStyles), {width : width *0.7 }]}>{step.message}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={combineStyles(GlobalStyles, 'margin_b_sm')}>
            <Text style={combineStyles(GlobalStyles, 'font_medium', 'text_lg', 'margin_b_sm')}>FAQs</Text>
            {faqs.map((faq, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={combineStyles(GlobalStyles, 'flex_row', 'items_center', 'padding_y_sm', 'jusify_between', 'border_t_xs', 'border_soft_blue')}
                  onPress={() => toggleFAQ(index)}
                >
                  <Text style={combineStyles(GlobalStyles, 'text_lg', 'font_medium')}>{faq.question}</Text>
                  <Icon name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} size={24} style={combineStyles(GlobalStyles, 'color_gray')}/>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <Text style={combineStyles(GlobalStyles, 'margin_b_sm', 'padding_x_xs', 'text_lg', 'color_gray')}>{faq.answer}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
        <View style={[combineStyles(GlobalStyles), {width : '100%', height : 50}]}></View>
      </ScrollView>
      <View style={combineStyles(GlobalStyles, 'absolute', 'background_white', 'bottom_0', 'right_0', 'left_0', 'padding_y_xs', 'padding_x_sm' )}>
        <TouchableOpacity style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')} onPress={() => router.push('/signin')}>
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 390,
  },
});

export default OnboardingScreen;
