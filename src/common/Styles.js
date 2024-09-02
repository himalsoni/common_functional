/**
 * Created for storing common styles of the application
 *
 * @format
 */

import { Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");
import Color from "./Color";

const Styles = {
  width: Dimensions.get("window").width,
  height: Platform.OS !== "ios" ? height : height - 20,
  navBarHeight: Platform !== "ios" ? height - width : 0,
  headerHeight: Platform.OS === "ios" ? 40 : 56,
  mainHeaderHeight: Platform.OS === "ios" ? 50 : 56,

  noDataImageConatiner: {
    alignItems: "center",
    justifyContent: 'center',
    flex: 1,
    // backgroundColor:'pink',
    // paddingBottom: width * 0.5
  },
  noDataIcon: {
    height: '60%',
    width: '60%',
    // alignItems:'center',
    // marginBottom:-width*0.5
  },
  isRequired:{
    color:Color.deleteColor,
    fontSize:16,
  },
};

export default Styles;
