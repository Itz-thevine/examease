import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import ArtIcon from 'react-native-vector-icons/AntDesign';
import { useAuth } from '@/context/auth';
import AppHeader from '@/components/shared/app-header';

const ProductDetailsScreen: React.FC = () => {
  const { selectedPlan } = useAuth();
  const [quantity, setQuantity] = useState<number>(1);
  const [count, setCount] = useState<number>(1);

  console.log("selectedPlan", selectedPlan);

  // Parse the response JSON string to an object
  const parsedPlan = JSON.parse(selectedPlan.response);

  const renderSchedule = () => {
    return parsedPlan.schedule.map((daySchedule: any, index: number) => (
      <View key={index} style={styles.scheduleContainer}>
        <Text style={styles.dayTitle}>Day {daySchedule.day}</Text>
        {daySchedule.courses.length > 0 ? (
          daySchedule.courses.map((course: any, idx: number) => (
            <View key={idx} style={styles.courseContainer}>
              <Text style={styles.courseName}>Course: {course.course_name}</Text>
              <Text>Exam Date: {course.exam_date}</Text>
              <Text>Days Till Exam: {course.days_till_exam}</Text>
              <Text>Priority: {course.priority}</Text>
              <Text>Difficulty: {course.difficulty}</Text>
              <Text>Percent of Study Time: {course.percent_of_study_time}%</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noCourses}>No courses scheduled for this day.</Text>
        )}
        <Text style={styles.dailyStudyTime}>Daily Study Time: {daySchedule.daily_study_time} hours</Text>
        <Text>In-Between Breaks: {daySchedule.inbetween_breaks} minutes</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={combineStyles(GlobalStyles, 'safeArea')}>
      <AppHeader />
      <ScrollView style={combineStyles(GlobalStyles, 'background_softer_blue')}>
        <View style={combineStyles(GlobalStyles, 'background_dark_blue', 'padding_sm')}>
          <View style={combineStyles(GlobalStyles, 'background_white', 'padding_sm', 'rounded_xs')}>
            <View style={combineStyles(GlobalStyles, 'flex_row', 'jusify_between')}>
              <View style={combineStyles(GlobalStyles, 'flex_row', 'items_center')}>
                <Text style={[combineStyles(GlobalStyles, 'text_2xl', 'font_bold')]}>Exam Plan Overview</Text>
              </View>
              <TouchableOpacity>
                <View style={[combineStyles(GlobalStyles, 'background_softer_blue', 'flex_row', 'items_center', 'padding_xs', 'rounded_full')]}>
                  <ArtIcon name='delete' size={20} color={'#A2112A'} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={combineStyles(GlobalStyles, 'jusify_between', 'flex_row', 'items_center')}>
              <Text style={combineStyles(GlobalStyles, 'margin_t_sm', 'text_lg')}>Plan Duration: {parsedPlan.exam_duration} days</Text>
              <Text style={combineStyles(GlobalStyles, 'margin_t_xs')}>Status: Completed</Text>
            </View>
          </View>
        </View>

        {/* Render Study Schedule */}
        <View style={styles.scheduleSection}>
          {renderSchedule()}
        </View>
      </ScrollView>

      {/* Footer can be added here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseContainer: {
    marginBottom: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dailyStudyTime: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noCourses: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  scheduleSection: {
    padding: 15,
  },
});

export default ProductDetailsScreen;
