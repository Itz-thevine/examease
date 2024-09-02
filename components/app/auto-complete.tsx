import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AutocompleteInput from 'react-native-autocomplete-input';
import { combineStyles } from '@/lib';
import { GlobalStyles } from '@/styles';

const { width } = Dimensions.get('window');

type AutocompleteProps = {
    searchQuery: string;
    searchResults: string[];
    searchOptionUp: boolean;
    onSearchChange: (query: string) => void;
    onSearchSelect: (item: string) => void;
    handleOutsideClick: () => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({ searchQuery, searchResults, searchOptionUp, onSearchChange, onSearchSelect, handleOutsideClick }) => {
    const SearchSuggestions = ({ item }: { item: string }) => (
        <TouchableOpacity onPress={() => onSearchSelect(item)}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
            <View style={{ position: 'relative', zIndex: 20, marginHorizontal: 10 }}>
                <View>
                    <AutocompleteInput
                        data={searchResults}
                        defaultValue={searchQuery}
                        onChangeText={onSearchChange}
                        inputContainerStyle={[combineStyles(GlobalStyles, 'flex_row', 'items_center', 'background_soft_blue', 'rounded_xs', 'border_xs', 'jusify_center', 'padding_sm'), { height: 65, borderWidth: 0 }]}
                        renderTextInput={(props) => (
                            <View style={combineStyles(GlobalStyles, 'safeArea')}>
                                <Ionicons name="search" size={20} color="#C0C0C7" style={[combineStyles(GlobalStyles, 'absolute'), { right: 8, top: 2 }]} />
                                <TextInput
                                    {...props}
                                    style={[combineStyles(GlobalStyles, 'safeArea', 'padding_l_xs')]}
                                    placeholder="Search Part Name or Number"
                                    placeholderTextColor="#C0C0C7"
                                />
                            </View>
                        )}
                        flatListProps={{
                            keyExtractor: (item, index) => index.toString(),
                            renderItem: () => null,
                        }}
                    />
                </View>

                {(searchResults.length === 0 && searchOptionUp) && (
                    <View style={{ position: 'absolute', top: 75, left: -30, width: width  }}>
                        <View style={[combineStyles(GlobalStyles, 'rounded_xs', 'padding_sm', 'background_soft_blue', 'margin_x_auto'), { width: width * 0.88 }]}>
                            <Text style={combineStyles(GlobalStyles)}>No product found</Text>
                        </View>
                    </View>
                )}
                {(searchResults.length > 0 && searchOptionUp) && (
                    <View style={{ position: 'absolute', top: 75, width: width }}>
                        <View style={[combineStyles(GlobalStyles, 'rounded_xs', 'padding_sm', 'background_soft_blue', 'margin_x_auto', 'absolute'), { width: width * 0.88, zIndex: 20 }]}>
                            <FlatList
                                data={searchResults}
                                renderItem={SearchSuggestions}
                                keyExtractor={(item) => item}
                                numColumns={1}
                                contentContainerStyle= {combineStyles(GlobalStyles, 'gap_sm')}
                            />
                        </View>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Autocomplete;
