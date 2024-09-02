import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const studyData = {
  exam_duration: 21,
  schedule: [
    {
      day: 1,
      courses: [
        {
          course_name: 'English Language',
          exam_date: '2024-08-25',
          days_till_exam: 11,
          priority: 2,
          difficulty: 6,
          percent_of_study_time: 0.6,
        },
        {
          course_name: 'Chemistry',
          exam_date: '2024-08-28',
          days_till_exam: 14,
          priority: 4,
          difficulty: 9,
          percent_of_study_time: 0.4,
        },
      ],
      daily_study_time: 4,
      inbetween_breaks: 15,
    },
    {
      day: 2,
      courses: [
        {
          course_name: 'Mathematics',
          exam_date: '2024-09-01',
          days_till_exam: 18,
          priority: 3,
          difficulty: 8,
          percent_of_study_time: 0.5,
        },
        {
          course_name: 'Physics',
          exam_date: '2024-09-10',
          days_till_exam: 27,
          priority: 5,
          difficulty: 8,
          percent_of_study_time: 0.5,
        },
      ],
      daily_study_time: 4,
      inbetween_breaks: 15,
    },
    {
      day: 3,
      courses: [
        {
          course_name: 'Biology',
          exam_date: '2024-09-15',
          days_till_exam: 32,
          priority: 1,
          difficulty: 7,
          percent_of_study_time: 0.7,
        },
        {
          course_name: 'Chemistry',
          exam_date: '2024-08-28',
          days_till_exam: 14,
          priority: 4,
          difficulty: 9,
          percent_of_study_time: 0.3,
        },
      ],
      daily_study_time: 4,
      inbetween_breaks: 15,
    },
  ],
};

const StudyScheduleUI: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {studyData.schedule.map((daySchedule, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Day {daySchedule.day}</Text>
          {daySchedule.courses.map((course, idx) => (
            <View key={idx} style={styles.courseContainer}>
              <View style={styles.courseDetails}>
                <Text style={styles.courseName}>{course.course_name}</Text>
                <Text style={styles.examDate}>{`Exam: ${course.exam_date}`}</Text>
              </View>
              <View style={styles.studyInfo}>
                <View style={styles.infoBlock}>
                  <Icon name="schedule" size={20} color="#4CAF50" />
                  <Text style={styles.studyTime}>{`${course.percent_of_study_time * daySchedule.daily_study_time} hr`}</Text>
                </View>
                <View style={styles.infoBlock}>
                  <Icon name="free-breakfast" size={20} color="#FF9800" />
                  <Text style={styles.breakTime}>{`${daySchedule.inbetween_breaks} min`}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F4F8',
  },
  dayContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  courseContainer: {
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  courseDetails: {
    marginBottom: 8,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  examDate: {
    fontSize: 14,
    color: '#757575',
  },
  studyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studyTime: {
    marginLeft: 6,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
  },
  breakTime: {
    marginLeft: 6,
    fontSize: 16,
    color: '#FF9800',
    fontWeight: '500',
  },
});

export default StudyScheduleUI;
