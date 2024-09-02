import { combineStyles } from "@/lib"
import { GlobalStyles } from "@/styles"
import { Image, Text, TouchableOpacity, View } from "react-native"
import AntIcon from "react-native-vector-icons/AntDesign"


const Sort = ({onPress}: {onPress : (value : any) => void}) => {
    return (
        <TouchableOpacity onPress={onPress} style={combineStyles(GlobalStyles, 'background_soft_blue', 'flex_row', 'items_center', 'padding_sm', 'rounded_full')}>
            <Image
                source={require('@/assets/images/sort.png')}
                style={[{ width: 16, height: 16 }]}
                resizeMode='contain'
            />
        </TouchableOpacity>
    )
}

export default Sort