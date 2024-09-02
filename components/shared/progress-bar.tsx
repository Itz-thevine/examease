import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { combineStyles } from '@/lib'; // Assuming this is a utility function for combining styles
import { GlobalStyles } from '@/styles'; // Assuming this is your global styles file

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
  moveNext: () => void;
  movePrevious: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps, moveNext, movePrevious }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const stepWidth = (Dimensions.get('window').width / steps.length) + 20;

  useEffect(() => {
    animateProgress(currentStep);
  }, [currentStep]);

  const animateProgress = (step: number) => {
    Animated.timing(progressAnim, {
      toValue: (step) * stepWidth,
      duration: 300,
      useNativeDriver: false, // Ensure this is false for width animations
    }).start();
  };

  return (
    <View style={combineStyles(GlobalStyles, 'padding_sm', 'background_dark_blue')}>
      <View style={[combineStyles(GlobalStyles, 'flex_row', 'items_center'), { position: 'relative' }]}>
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <View style={index <= currentStep ? styles.progressCircleFilledWrapper : styles.progressCircleFilledNone}>
              <View style={index <= currentStep ? styles.progressCircleFilled : styles.progressCircle} />
            </View>
            {index < steps.length - 1 && <View style={styles.progressLine} />}
          </React.Fragment>
        ))}
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim,
            },
          ]}
        />
      </View>
      <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between', 'margin_t_xs')}>
        {steps.map((step, index) => (
          <Text key={index} style={index <= currentStep ? styles.progressLabelActive : styles.progressLabel}>
            {step}
          </Text>
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  progressCircleFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f9a825',
  },
  progressCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#999',
  },
  progressCircleFilledWrapper: {
    backgroundColor: 'rgba(246, 167, 13, 0.5)',
    height: 30, 
    width: 30,
    justifyContent: 'center',
    alignItems : 'center', 
    borderRadius: 100,
  },
  progressCircleFilledNone: {},
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#999',
    marginHorizontal: 5,
  },
  progressBar: {
    position: 'absolute',
    left: 10,
    top: 14,
    height: 2,
    backgroundColor: '#f9a825',
  },
  progressLabelActive: {
    color: '#f9a825',
    fontSize: 12,
  },
  progressLabel: {
    color: '#999',
    fontSize: 12,
  },
  navigationButton: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default ProgressBar;
