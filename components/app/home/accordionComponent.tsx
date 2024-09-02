import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, LayoutAnimation } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Entypo } from '@expo/vector-icons';
import { DynamicObject, Section } from '@/types';

interface SectionItem {
  assemblyGroupName: string;
  hasChilds: boolean;
  assemblyGroupNodeId: number;
  subcategories?: SectionItem[];
}

interface CategoriesProps {
  categories: Section[];
  selectedCategories: DynamicObject;
  setSelectedCategories: (value: DynamicObject) => void;
}

const AccordionComponent = ({ categories, selectedCategories, setSelectedCategories }: CategoriesProps) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [sectionItems, setSectionItems] = useState<{ [key: number]: SectionItem[] }>({});
  const [loadingSections, setLoadingSections] = useState<number[]>([]);
  const [activeSubsections, setActiveSubsections] = useState<{ [key: number]: number | null }>({});
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [terminal, setTerminal] = useState({})

  const toggleSection = async (index: number, parent_node_id: number) => {
    if (activeSection === index) {
      setActiveSection(null);
    } else {
      setActiveSection(index);

      // Fetch data if not already fetched
      if (!sectionItems[index]) {
        await fetchSectionItems(index, parent_node_id);
      }
    }
  };

  const fetchSectionItems = async (index: number, parent_node_id: number) => {
    setLoadingSections((prevLoadingSections) => [...prevLoadingSections, index]);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/get-sub-catogery?parent_node_id=${parent_node_id}&all_category=false&linked=false&lang=en`);
      const data = await res.json();
      const response = data?.data.array || [];
      setSectionItems((prevItems) => ({ ...prevItems, [index]: response }));
    } catch (error) {
      console.error('Error fetching section items:', error);
    } finally {
      setLoadingSections((prevLoadingSections) => prevLoadingSections.filter((i) => i !== index));
    }
  };

  const toggleSubsection = async (sectionIndex: number, subIndex: number, parent_node_id: number) => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (!sectionItems[sectionIndex][subIndex].hasChilds) {
      setSelectedCategories(sectionItems[sectionIndex][subIndex]);
      setActiveItem(parent_node_id);
      return;
    }

    setActiveSubsections((prevActiveSubsections) => ({
      ...prevActiveSubsections,
      [sectionIndex]: prevActiveSubsections[sectionIndex] === subIndex ? null : subIndex,
    }));

    setActiveItem(parent_node_id);

    if (sectionItems[sectionIndex] && sectionItems[sectionIndex][subIndex].hasChilds) {
      const subcategory = sectionItems[sectionIndex][subIndex];
      if (!subcategory.subcategories) {
        await fetchSubcategoryItems(sectionIndex, subIndex, parent_node_id);
      }
    }
  };

  const fetchSubcategoryItems = async (sectionIndex: number, subIndex: number, parent_node_id: number) => {
    setLoadingSections((prevLoadingSections) => [...prevLoadingSections, subIndex]);
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/listen/get-sub-catogery?parent_node_id=${parent_node_id}&all_category=false&linked=false&lang=en`);
      const data = await res.json();
      const response = data?.data.array || [];
      setSectionItems((prevItems) => {
        const updatedItems = [...(prevItems[sectionIndex] || [])];
        updatedItems[subIndex] = { ...updatedItems[subIndex], subcategories: response };
        return { ...prevItems, [sectionIndex]: updatedItems };
      });
    } catch (error) {
      console.error('Error fetching subcategory items:', error);
    } finally {
      setLoadingSections((prevLoadingSections) => prevLoadingSections.filter((i) => i !== subIndex));
    }
  };

  const renderSubcategory = useCallback(
    (subcategory: SectionItem, sectionIndex: number, subIndex: number, level: number = 1, terminal={}) => {
      const isSubActive = activeSubsections[sectionIndex] === subIndex;
      const isActive = activeItem === subcategory.assemblyGroupNodeId;
      const selectedCategory = terminal === subcategory 
      return (
        <View key={subIndex} style={{ paddingLeft: level * 16 }}>
          <TouchableOpacity
            onPress={() => {
              if(subcategory.hasChilds){
                toggleSubsection(sectionIndex, subIndex, subcategory.assemblyGroupNodeId)
              }else{
                setSelectedCategories(subcategory)
                setTerminal(subcategory)
              }
            }}
            style={[styles.subHeader, isActive && styles.activeSubHeader, selectedCategory && styles.selectedSubCategories]}
          >
            <Text style={[styles.subHeaderText, selectedCategory && styles.activeSubHeaderText]}>
              {subcategory.assemblyGroupName}
            </Text>
            {subcategory.hasChilds && (
              <Entypo name={isSubActive ? 'chevron-up' : 'chevron-down'} size={16} color="black" />
            )}
          </TouchableOpacity>
          {subcategory.hasChilds && (
            <Collapsible collapsed={!isSubActive}>
              {loadingSections.includes(subIndex) ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                subcategory.subcategories?.map((item, nestedIndex) =>
                  renderSubcategory(item, sectionIndex, nestedIndex, level + 1, terminal)
                )
              )}
            </Collapsible>
          )}
        </View>
      );
    },
    [activeSubsections, loadingSections, activeItem]
  );

  return (
    <ScrollView style={styles.container}>
      {categories?.map((section, index) => (
        <View key={index} style={[styles.section, activeSection === index && styles.activeSection]}>
          <TouchableOpacity
            onPress={() => toggleSection(index, section.assemblyGroupNodeId)}
            style={[styles.header, activeSection === index && styles.activeHeader]}
          >
            <Image source={require('../../../assets/images/products/enging.png')} style={styles.image} />
            <Text style={[styles.headerText, activeSection === index && styles.activeHeaderText]}>
              {section.assemblyGroupName}
            </Text>
            <Entypo name={activeSection === index ? 'chevron-up' : 'chevron-down'} size={16} color="black" />
          </TouchableOpacity>
          <Collapsible collapsed={activeSection !== index}>
            {loadingSections.includes(index) ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              sectionItems[index]?.map((item, subIndex) => renderSubcategory(item, index, subIndex, 0 ,terminal))
            )}
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 10,
    backgroundColor: '#E9EBF4',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeSection: {
    backgroundColor: '#D0D4E0',
    borderColor: '#8B9DB0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activeHeader: {
    backgroundColor: '#C8CED9',
  },
  headerText: {
    flex: 1,
    fontSize: 16,
  },
  activeHeaderText: {
    fontWeight: 'bold',
    color: '#4F5A6E',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeSubHeader: {
    backgroundColor: '#D0D4E0',
  },
  selectedSubCategories: {
    borderWidth: 0,
    borderRadius: 30,
    marginHorizontal: 20,
    backgroundColor: '#5B5D7C',
  },
  subHeaderText: {
    flex: 1,
    fontSize: 14,
    color: "#1D1F38"
  },
  activeSubHeaderText: {
    fontWeight: 'bold',
    color: '#1D1F38',
  },
});

export default AccordionComponent;
