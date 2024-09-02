import { StyleSheet } from "react-native";

/* fonts */
export const FontFamily = {
    interSemiBold: "Inter-SemiBold",
    interMedium: "Inter-Medium",
    interRegular: "Inter-Regular",
    interBold: "Inter-Bold",
    interLight: "Inter-Light",
  };

  export const FontSize = {
    size_sm: 14,
    size_xs: 12,
    size_5xl: 24,
  };
  

  export const Color = {
    colorGhostwhite: "#f5f8ff",
    colorWhite: "#fff",
    colorRoyalblue: "#1d6aff",
    colorGray: "#1f233a",
    colorLavender: "#dbdde9",
  };

  export const Border = {
    br_42xl: 61,
    br_47xl: 66,
    br_64xl: 83,
    br_6xl: 25,
    br_6xs: 7,
  };
  

  export const GlobalStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
      paddingTop: 40,
      paddingHorizontal: 20,
    },
    logo: {
      height: 70,
      width: 100,
    },

    // flex
    flex_row: {
      flexDirection: 'row',
    },
    items_center: {
      alignItems: 'center',
    },
    items_start: {
      alignItems: 'flex-start',
    },
    items_end: {
      alignItems : 'flex-end'
    },
    items_between: {
      alignItems : 'stretch'
    },
    jusify_between : {
      justifyContent: 'space-between'
    },
    jusify_start: {
      justifyContent: 'flex-start'
    },
    jusify_center : {
      justifyContent: 'center'
    },
    jusify_end : {
      justifyContent: 'flex-end'
    },
    align_self: {
      alignSelf: 'flex-end',
    },

    // position
    relative: {
      position: 'relative',
    },
    absolute: {
      position: 'absolute',
    },
    bottom_0 : {
      bottom: 0
    },
    right_0 : {
      right: 0
    },
    left_0 : {
      left: 0
    },
    top_0 : {
      top: 0
    },

    // gap
    gap_xl: {
      gap: 20
    },
    gap_lg: {
      gap: 16
    },
    gap_md: {
      gap: 12
    },
    gap_sm: {
      gap: 8
    },
    gap_xs: {
      gap: 4
    },

    //global padding 
    padding_xs: {
      padding: 10,
    },
    padding_sm: {
      padding: 20,
    },
    padding_x_sm: {
      paddingHorizontal: 20,
    },
    padding_x_xs: {
      paddingHorizontal: 10,
    },
    padding_y_sm: {
      paddingVertical: 20,
    },
    padding_y_xs: {
      paddingVertical: 10,
    },
    padding_r_sm: {
      paddingRight: 20,
    },
    padding_r_xs: {
      paddingRight: 10,
    },
    padding_l_sm: {
      paddingLeft: 20,
    },
    padding_l_xs: {
      paddingLeft: 10,
    },
    padding_t_sm: {
      paddingTop: 20,
    },
    padding_t_xs: {
      paddingTop: 10,
    },
    padding_b_sm: {
      paddingBottom: 20,
    },
    padding_b_xs: {
      paddingBottom: 10,
    },

    //global margin
    margin_sm: {
      margin: 20,
    },
    margin_xs: {
      margin: 10,
    },
    margin_x_auto: {
      marginHorizontal: 'auto',
    },
    margin_b_xs: {
      marginBottom: 10,
    },
    margin_b_sm: {
      marginBottom: 20,
    },
    margin_t_xs: {
      marginTop: 10,
    },
    margin_t_sm: {
      marginTop: 20,
    },
    margin_r_sm: {
      marginRight: 20,
    },
    margin_r_xs: {
      marginRight: 10,
    },
    margin_l_sm: {
      marginLeft: 20,
    },
    margin_l_xs: {
      marginLeft: 10,
    },

    //global fonts weight
    font_bold: {
      fontWeight: '800'
    },
    font_medium: {
      fontWeight: '600'
    },
    font_lighter: {
      fontWeight: '300'
    },

    // font size 
    text_5xl: {
      fontSize: 24,
    },
    text_4xl: {
      fontSize: 22,
    },
    text_3xl: {
      fontSize: 20,
    },
    text_2xl: {
      fontSize: 18,
    },
    text_lg: {
      fontSize: 16,
    },
    text_sm: {
      fontSize: 14,
    },
    text_xs: {
      fontSize: 12,
    },
    text_center: {
      textAlign: 'center'
    },

    // line height
    line_5xl: {
      lineHeight: 40
    },
    line_4xl: {
      lineHeight: 35
    },
    line_3xl: {
      lineHeight: 30
    },
    line_lg: {
      lineHeight: 25
    },

    // text style
    text_italic: {
      fontStyle: 'italic'
    },

    //global colors
    color_ghost_white: {
      color: "#f5f8ff"
    },
    color_white: {
      color: "#fff"
    },
    color_royal_blue: {
      color: "#1d6aff"
    },
    color_gray: {
      color: "#9FA3B0"
    },
    color_lavender: {
      color: "#dbdde9"
    },
    color_danger: {
      color: "#ff0000"
    },
    color_warning: {
      color: "#F6A70D"
    },

    // background color
    background_soft_blue: {
      backgroundColor: '#e9eBf4'
    },
    background_softer_blue: {
      backgroundColor: '#F5F8FF'
    },
    background_royal_blue: {
      backgroundColor: "#1d6aff"
    },
    background_dark_blue: {
      backgroundColor: "#1F243A"
    },
    background_white: {
      backgroundColor: "white"
    },
    background_danger: {
      backgroundColor: "#ff0000"
    },
    background_warning: {
      backgroundColor: "#F6A70D"
    },
    background_transparent: {
      backgroundColor: "transparent"
    },

    // border
    rounded_full : {
      borderRadius: 100
    },
    rounded_lg : {
      borderRadius: 80
    },
    rounded_md : {
      borderRadius: 60
    },
    rounded_sm : {
      borderRadius: 40
    },
    rounded_xs : {
      borderRadius: 20
    },

    border_b_xs : {
      borderBottomWidth: 1,
    },
    border_t_xs : {
      borderTopWidth: 1,
    }, 

    border_xs : {
      borderWidth: 0.5,
    },
    border_sm : {
      borderWidth: 1,
    }, 

    // border coloe
    border_soft_blue: {
      borderColor: '#e9eBf4',
    },
    border_gray: {
      borderColor: '#9FA3B0',
    },
    border_soft_gray: {
      borderColor: '#454A5C',
    },
    border_royal_blue: {
      borderColor: '#1d6aff'
    },

  })