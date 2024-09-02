import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import Balance from './earnings-balance';
import History from './earnings-history';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [400, 450, 500, 600, 650, 700, 750],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
};

const Earnings: React.FC = () => {
  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'background_softer_blue')}>
      <ScrollView style={combineStyles(GlobalStyles, 'padding_sm')}>
        <Balance />
        <BarChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          yAxisLabel="$"
          yAxisSuffix=""
        />
        <History />
        <View style={{width: '100%', height: 200}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default Earnings;
