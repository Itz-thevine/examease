import * as React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Dimensions, LayoutAnimation, Platform, UIManager } from 'react-native';
import { List, Provider as PaperProvider } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

type CarDetails = {
  carId: number;
  fuelType: string;
  powerHpFrom: number;
  powerHpTo: number;
  powerKwFrom: number;
  powerKwTo: number;
  yearOfConstrFrom: number;
  yearOfConstrTo: number | null;
};

type CarModel = {
  [model: string]: CarDetails[];
};

type CarData = {
  [brand: string]: CarModel;
};

const { width } = Dimensions.get('window');

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Sample static data
const staticCarData: CarData = {
  'Toyota': {
    'Camry': [
      { carId: 1, fuelType: 'Petrol', powerHpFrom: 150, powerHpTo: 200, powerKwFrom: 110, powerKwTo: 150, yearOfConstrFrom: 2010, yearOfConstrTo: 2020 },
      { carId: 2, fuelType: 'Hybrid', powerHpFrom: 170, powerHpTo: 220, powerKwFrom: 120, powerKwTo: 160, yearOfConstrFrom: 2020, yearOfConstrTo: null },
    ],
    'Corolla': [
      { carId: 3, fuelType: 'Diesel', powerHpFrom: 90, powerHpTo: 120, powerKwFrom: 67, powerKwTo: 89, yearOfConstrFrom: 2005, yearOfConstrTo: 2015 },
    ],
  },
  'Honda': {
    'Civic': [
      { carId: 4, fuelType: 'Petrol', powerHpFrom: 120, powerHpTo: 160, powerKwFrom: 89, powerKwTo: 119, yearOfConstrFrom: 2008, yearOfConstrTo: 2018 },
    ],
  },
};

const CarAccordion: React.FC<{ data: CarData }> = ({ data }) => {
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [carData, setCarData] = useState<CarData>(data);

  const handleBrandPress = (brand: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedBrand(expandedBrand === brand ? null : brand);
    setExpandedModel(null);
  };

  const handleModelPress = (model: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedModel(expandedModel === model ? null : model);
  };

  const removeItem = (brand: string, model?: string, carId?: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCarData((prevCarData) => {
      const updatedData = { ...prevCarData };

      if (carId !== undefined) {
        const updatedCars = updatedData[brand][model!].filter(car => car.carId !== carId);
        updatedData[brand][model!] = updatedCars;

        if (updatedCars.length === 0) {
          delete updatedData[brand][model!];
          if (Object.keys(updatedData[brand]).length === 0) {
            delete updatedData[brand];
          }
        }
      } else if (model !== undefined) {
        delete updatedData[brand][model];
        if (Object.keys(updatedData[brand]).length === 0) {
          delete updatedData[brand];
        }
      } else {
        delete updatedData[brand];
      }

      return updatedData;
    });
  };

  return (
    <ScrollView>
      {Object.keys(carData).map((brand) => (
        <View key={brand} style={styles.accordionWrapper}>
          <List.Accordion
            title={brand}
            style={styles.brandAccordion}
            expanded={expandedBrand === brand}
            onPress={() => handleBrandPress(brand)}
          >
            {Object.keys(carData[brand]).map((model) => (
              <View key={model} style={styles.accordionWrapper}>
                <List.Accordion
                  title={model}
                  expanded={expandedModel === model}
                  onPress={() => handleModelPress(model)}
                  style={styles.modelAccordion}
                >
                  {carData[brand][model].map((car) => (
                    <View key={car.carId} style={styles.accordionWrapper}>
                      <List.Item
                        title={`${car.fuelType}, ${car.powerHpFrom}-${car.powerHpTo} HP`}
                        description={`KW: ${car.powerKwFrom}-${car.powerKwTo}, Year: ${car.yearOfConstrFrom} - ${car.yearOfConstrTo || 'present'}`}
                        style={styles.carItem}
                      />
                      <TouchableOpacity style={styles.iconContainer} onPress={() => removeItem(brand, model, car.carId)}>
                        <AntDesign name="minus" size={18} color="#1F243A" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </List.Accordion>
                <TouchableOpacity style={styles.iconContainer} onPress={() => removeItem(brand, model)}>
                  <AntDesign name="minus" size={18} color="#1F243A" />
                </TouchableOpacity>
              </View>
            ))}
          </List.Accordion>
          <TouchableOpacity style={styles.iconContainer} onPress={() => removeItem(brand)}>
            <AntDesign name="minus" size={18} color="#1F243A" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const CompatibilityComp: React.FC = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <CarAccordion data={staticCarData} />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  accordionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 16,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20
  },
  brandAccordion: {
    backgroundColor: 'white',
    height: 60,
    width: width * 0.75,
    paddingHorizontal: 0,
  },
  modelAccordion: {
    backgroundColor: 'white',
    height: 60,
    width: width * 0.7,
    paddingLeft: 20,
  },
  carItem: {
    backgroundColor: 'white',
    height: 60,
    width: width * 0.65,
    paddingLeft: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 32,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default CompatibilityComp;
