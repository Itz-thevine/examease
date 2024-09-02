import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/app/firebaseConfig';
import { getAuth } from 'firebase/auth';

const ProductSuggestion: React.FC<{ setIsVisible: (value: boolean) => void, userSnap: any }> = ({ setIsVisible, userSnap }) => {
    const [step, setStep] = useState(1);
    const [readingTime, setReadingTime] = useState<string>('');
    const [studyDevice, setStudyDevice] = useState<string>('');
    const [breaks, setBreaks] = useState<string>('');

    const auth = getAuth();
    const user = auth.currentUser;

    const handleSubmit = () => {
        if (readingTime.trim() && studyDevice.trim() && breaks.trim()) {
            setDoc(doc(db, 'users', `${user?.email && (user?.email).replace(/[@.]/g, '-')}`), {
                ...userSnap,
                daily_study_time: readingTime,
                preferred_study_device: studyDevice,
                breaks_in_between: breaks,
              });
            Alert.alert('Success', `Your preferences have been saved.`);
            setIsVisible(false); // Optionally close the modal after submission
        } else {
            Alert.alert('Error', 'Please fill out all fields.');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View>
                        <Text style={styles.label}>Enter your preferred reading time (in hours):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., 4"
                            keyboardType="numeric"
                            value={readingTime}
                            onChangeText={setReadingTime}
                        />
                    </View>
                );
            case 2:
                return (
                    <View>
                        <Text style={styles.label}>Enter your preferred study device:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Laptop, Tablet"
                            value={studyDevice}
                            onChangeText={setStudyDevice}
                        />
                    </View>
                );
            case 3:
                return (
                    <View>
                        <Text style={styles.label}>Enter your breaks in-between reading time (in minutes):</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., 15"
                            keyboardType="numeric"
                            value={breaks}
                            onChangeText={setBreaks}
                        />
                    </View>
                );
            default:
                return null;
        }
    };

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    return (
        <SafeAreaView>
            <View style={[combineStyles(GlobalStyles, 'padding_xs', 'jusify_end'), {marginTop: 100}]}>
                {renderStep()}
                <TouchableOpacity style={styles.submitButton} onPress={handleNextStep}>
                    <Text style={styles.submitButtonText}>{step < 3 ? 'Next' : 'Submit'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#007aff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductSuggestion;
