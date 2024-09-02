import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArtIcon from 'react-native-vector-icons/AntDesign';
import AppHeader from '@/components/shared/app-header';
import { combineStyles, height } from '@/lib';
import { GlobalStyles } from '@/styles';
import { ScrollView } from 'react-native';
import { router } from 'expo-router';
import CustomModal from '@/components/shared/custom-modal';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/app/firebaseConfig';
import { useAuth } from '@/context/auth';

const ProductListingPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [firstDate, setFirstDate] = useState('');
  const [lateDate, setLateDate] = useState('');
  const [isSellerSuccessModalOpen, setIsSellerSuccesModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [courses, setCourses] = useState([{ id: 1, name: '', examDate: '', difficulty: 1, priority: 1, isOnline: false }]);
  
  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;  
    const date = new Date(dateString);
    const timestamp = date.getTime();
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;
    return dateString === date.toISOString().split('T')[0];
  };


  const auth = getAuth();
  const user = auth.currentUser;
  const {setSelectedPlan} = useAuth()
  

  const [userSnap, setUserSnap] = useState<any>(null);

  useEffect(() => {
    const fetchUserDoc = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = (doc(db, 'users', `${user?.email && (user?.email).replace(/[@.]/g, '-')}`));
        onSnapshot(userRef, (doc) => {
          setUserSnap(doc.data())
        });
      }
    };

    fetchUserDoc(); // Call the async function
  }, []); // Empty dependency array ensures this runs once on mount

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      name: '',
      examDate: '',
      difficulty: 1,
      priority: 1,
      isOnline: false,
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: number, field: string, value: any) => {
    setCourses(
      courses.map(course =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculateDaysTillExam = (examDate: string) => {
    const today = new Date();
    const examDay = new Date(examDate);
    const differenceInTime = examDay.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert time to days
  };

  
  const validateFields = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Title is required.');
      return false;
    }
  
    if (!firstDate.trim() || !isValidDate(firstDate)) {
      Alert.alert('Validation Error', 'First date is required and must be in YYYY-MM-DD format.');
      return false;
    }
  
    if (!lateDate.trim() || !isValidDate(lateDate)) {
      Alert.alert('Validation Error', 'Late date is required and must be in YYYY-MM-DD format.');
      return false;
    }
  
    if (courses.some(course => !course.name.trim() || !course.examDate.trim() || !isValidDate(course.examDate))) {
      Alert.alert('Validation Error', 'All courses must have a name and a valid exam date in YYYY-MM-DD format.');
      return false;
    }
  
    return true;
  };

  const createPlanObject = () => {
    const planObject = {
      userId: user?.email, // Replace with actual user ID
      courses: courses.map(course => ({
        course_name: course.name,
        exam_date: course.examDate,
        days_till_exam: calculateDaysTillExam(course.examDate),
        is_online: course.isOnline,
        difficulty: course.difficulty,
        priority: course.priority,
      })),
      courses_per_day: 2, 
      first_exam: firstDate,
      last_exam: lateDate,
      study_device: userSnap.preferred_study_device,
      daily_study_time: userSnap.daily_study_time,
      inbetween_breaks: userSnap.breaks_in_between,
    };
    
    return planObject;
  };

  const handleCreate = async () => {
    if (!validateFields()) {
      return;
    }
  
    setIsLoading(true); // Start loading
  
    const plan = createPlanObject();
  
    try {
      const response = await fetch('https://divine-server-pb4u.onrender.com/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Plan successfully submitted:', responseData);
        setDoc(doc(db, 'users', `${user?.email && (user?.email).replace(/[@.]/g, '-')}`), {
          ...userSnap,
          schedules: [
            ...userSnap.schedules,
            responseData
          ]
        });
        
        setSelectedPlan(responseData)
        setIsSellerSuccesModalOpen(true);
      } else {
        const errorData = await response.json();
        console.error('Failed to submit the plan:', errorData);
        Alert.alert('Error', 'Failed to create plan. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Alert.alert('Error', 'An error occurred while creating the plan. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  

  const renderCourseItem = ({ item }: { item: any }) => (
    <View style={styles.courseContainer}>
      <CustomModal
        isVisible={isSellerSuccessModalOpen}
        onClose={() => setIsSellerSuccesModalOpen(false)}
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
            <Text style={[combineStyles(GlobalStyles, 'text_5xl', 'font_medium', 'color_white', 'text_center', 'line_5xl', 'margin_b_sm', 'margin_t_sm'), {width: 300}]}>Success</Text>
            <Text style={[combineStyles(GlobalStyles, 'color_white', 'font_medium', 'text_lg' ,'margin_t_sm', 'text_center', 'line_lg'), {
                width: 250
            }]}>Plan has been successfully created!</Text>
           
            <View style={combineStyles(GlobalStyles, 'margin_t_sm')}>
                <TouchableOpacity style={[combineStyles(GlobalStyles, 'background_royal_blue', 'padding_y_sm', 'rounded_full', 'items_center'), {width: 300, marginTop: 100}]} onPress={() =>{
                  router.push('/(customer)/product-details')
                  setIsSellerSuccesModalOpen(false)
                }}>
                    <Text style={combineStyles(GlobalStyles, 'color_white', 'font_medium')}>Check preview</Text>
                </TouchableOpacity>
            </View>
          
        </View>
      </CustomModal>

      <View style={styles.row}>
        <TextInput
          style={styles.courseNameInput}
          placeholder="Course name"
          value={item.name}
          onChangeText={(text) => updateCourse(item.id, 'name', text)}
        />
        <TouchableOpacity style={styles.deleteButton} onPress={() => removeCourse(item.id)}>
          <ArtIcon name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={[combineStyles(GlobalStyles, 'jusify_between', 'items_between', 'flex_row', 'gap_xl', 'margin_b_sm')]}>
        <View style={styles.inputGroup}>
          <Icon name="event" size={20} color="#888" />
          <TextInput
            style={styles.smallInput}
            placeholder="Exam date"
            value={item.examDate}
            onChangeText={(text) => updateCourse(item.id, 'examDate', text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Difficulty:</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => updateCourse(item.id, 'difficulty', item.difficulty - 1)}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{item.difficulty}</Text>
            <TouchableOpacity onPress={() => updateCourse(item.id, 'difficulty', item.difficulty + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority:</Text>
          <View style={styles.counter}>
            <TouchableOpacity onPress={() => updateCourse(item.id, 'priority', item.priority - 1)}>
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{item.priority}</Text>
            <TouchableOpacity onPress={() => updateCourse(item.id, 'priority', item.priority + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Is online:</Text>
          <TouchableOpacity onPress={() => updateCourse(item.id, 'isOnline', !item.isOnline)}>
            <View style={[styles.checkbox, item.isOnline && styles.checkboxChecked]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <ScrollView style={combineStyles(GlobalStyles, 'padding_sm', 'safeArea')}>
        <Text style={styles.header}>Create new plan</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Enter Item Title"
          value={title}
          onChangeText={setTitle}
          maxLength={90}
        />
        <Text style={styles.charCount}>{title.length} / 90</Text>

        <View style={styles.dateContainer}>
          <View style={styles.dateInputContainer}>
            <Icon name="event" size={20} color="#888" />
            <TextInput
              style={styles.dateInput}
              placeholder="First date - YYYY-MM-DD"
              value={firstDate}
              onChangeText={setFirstDate}
            />
          </View>
          <Text style={styles.dateSeparator}>-</Text>
          <View style={styles.dateInputContainer}>
            <Icon name="event" size={20} color="#888" />
            <TextInput
              style={styles.dateInput}
              placeholder="Late date - YYYY-MM-DD"
              value={lateDate}
              onChangeText={setLateDate}
            />
          </View>
        </View>

        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={() => (
            <TouchableOpacity onPress={addCourse} style={styles.addCourseButton}>
              <Text style={styles.addCourseButtonText}>+ Add another course</Text>
            </TouchableOpacity>
          )}
        />

        
      </ScrollView>
      <View style={combineStyles(GlobalStyles, 'background_white', 'padding_x_sm', 'padding_y_xs')}>
        <TouchableOpacity
          style={combineStyles(GlobalStyles, 'background_royal_blue', 'items_center', 'rounded_full', 'padding_y_sm')}
          onPress={handleCreate}
          disabled={isLoading} // Disable button during loading
        >
          <Text style={combineStyles(GlobalStyles, 'text_lg', 'color_white', 'font_medium')}>
            {isLoading ? 'Creating...' : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  charCount: {
    textAlign: 'right',
    color: '#888',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  dateInput: {
    marginLeft: 8,
    flex: 1,
  },
  dateSeparator: {
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  courseContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%'
  },
  courseNameInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#A2112A',
    borderRadius: 8,
    padding: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  smallInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginLeft: 8,
    backgroundColor: '#fff',
  },
  label: {
    marginRight: 8,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  counterButton: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  counterValue: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  addCourseButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addCourseButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductListingPage;
