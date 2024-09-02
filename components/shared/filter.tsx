import { combineStyles } from "@/lib"
import { GlobalStyles } from "@/styles"
import { Text, TouchableOpacity, View } from "react-native"
import AntIcon from "react-native-vector-icons/AntDesign"

const Filter = ({onPress}: {onPress : (value : any) => void}) => {
    return (
        <TouchableOpacity onPress={onPress} style={combineStyles(GlobalStyles, 'background_dark_blue', 'flex_row', 'items_center', 'padding_xs', 'padding_x_sm', 'rounded_full')}>
            <AntIcon name="filter" size={20} color={'white'}/>
            <Text style={combineStyles(GlobalStyles, 'color_white', 'margin_l_xs')}>Filters</Text>
        </TouchableOpacity>
    )
}

export default Filter