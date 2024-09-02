import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { combineStyles, height } from '@/lib';
import { GlobalStyles } from '@/styles';
import { router } from 'expo-router';
import { useAuth } from '@/context/auth';

interface iProps {
  data: any[]
}

const OrderTabs: React.FC<iProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {setSelectedPlan} = useAuth()

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const renderOrderItem = ({ item }: { item: any }) => {
    const parsedResponse = JSON.parse(item.response);
    const { exam_duration, schedule } = parsedResponse;

    // Extract course names from the schedule
    const courseNames = Array.from(new Set(schedule.flatMap((day: any) => day.courses.map((course : any) => course.course_name))));

    return (
      <View style={styles.listContainer}>
        <View style={styles.planHeader}>
          <Text style={styles.planTitle}>Exam Duration: {exam_duration} days</Text>
          <TouchableOpacity onPress={() => {
            setSelectedPlan(item)
            router.push('/(customer)/product-details')
            }}>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.planDescription}>
          This plan includes a total of {schedule.length} days of study. 
        </Text>
        <Text style={styles.courseList}>
        Courses: {courseNames.join(', ')}
        </Text>
        <Text style={styles.planSummary}>
          First Exam Date: {schedule[0]?.courses[0]?.exam_date} | Last Exam Date: {schedule[schedule.length - 1]?.courses[schedule[schedule.length - 1].courses.length - 1]?.exam_date}
        </Text>
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
    }

    if (data.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No plan for user yet, Click to create</Text>
          <Text style={styles.subText}>There is a whole lot you can do with ExamEase</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <SafeAreaView style={[combineStyles(GlobalStyles, 'background_softer_blue'), { height }]}>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    height: 300, 
    borderRadius: 10,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
  },
  listContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewDetails: {
    fontSize: 14,
    color: '#007bff',
  },
  planDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  courseList: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  planSummary: {
    fontSize: 14,
    color: '#555',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default OrderTabs;
