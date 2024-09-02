import React, { useState } from 'react';
import { Alert, Modal, Pressable, Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface iSelectModelModal {
  isVisible: boolean;
  setIsVisible: (key: any) => void;
}

const models = ["Model S", "Model 3", "Model X", "Model Y"];
const engines = ["Electric", "Hybrid", "Gasoline"];
const categories = ["Sedan", "SUV", "Truck"];
const subcategories = ["Luxury", "Standard", "Economy"];

const SelectModelModal = ({
  isVisible,
  setIsVisible,
}: iSelectModelModal) => {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedEngine, setSelectedEngine] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSelect = (item: string) => {
    if (step === 1) setSelectedModel(item);
    if (step === 2) setSelectedEngine(item);
    if (step === 3) setSelectedCategory(item);
    if (step === 4) setSelectedSubcategory(item);
    nextStep();
  };

  const handleClose = () => {
    Alert.alert('Modal has been closed.');
    setIsVisible(false);
    setStep(1);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => handleSelect(item)}>
      <Ionicons name={step === 1 ? 'car' : step === 2 ? 'battery-charging' : step === 3 ? 'list' : 'options'} size={24} color="black" />
      <Text style={styles.listItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const data = step === 1 ? models : step === 2 ? engines : step === 3 ? categories : subcategories;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Pressable
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </Pressable>
              <Text style={styles.modalText}>
                {step === 1 && "Select Model"}
                {step === 2 && "Select Engine"}
                {step === 3 && "Select Category"}
                {step === 4 && "Select Subcategory"}
              </Text>

              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                style={styles.flatList}
              />

              <View style={styles.buttonContainer}>
                {step > 1 && (
                  <Pressable
                    style={[styles.button, styles.buttonBack]}
                    onPress={prevStep}>
                    <Text style={styles.textStyle}>Back</Text>
                  </Pressable>
                )}
                {step === 4 && (
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleClose}>
                    <Text style={styles.textStyle}>Finish</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: width,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 15,
    padding: 10,
    color: 'black'
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '40%',
  },
  buttonBack: {
    backgroundColor: '#6c757d',
  },
  buttonClose: {
    backgroundColor: '#28a745',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  flatList: {
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default SelectModelModal;
