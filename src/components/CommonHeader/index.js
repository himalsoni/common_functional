import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { Images, Color, Constants } from "@common";
import { log, playAppSound } from "@common/Tools";

export default CommonHeader = (props) => {

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerBtnContainer}>
        {props.showBack ?
          <TouchableOpacity style={styles.backImageContainer} onPress={() => {
            props.navigation.goBack();
            playAppSound(Constants.allBtnClickUrl);
          }}>
            <Image style={styles.backImage} source={Images.back} resizeMode="contain" />
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.menuImageContainer} onPress={props.onLeftIconClick}>
            <Image style={styles.menuImage} source={Images.menu} resizeMode="contain" />
          </TouchableOpacity>
        }
        <Text style={styles.headerText}>{props.title}</Text>
      </View>
      {props.rightImage !== null &&
        <Image style={props.homekid ? styles.homeKidImage : styles.innerTopImage} source={props.rightImage} resizeMode="contain" />
      }
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Platform.OS === "ios" ? 0 : (StatusBar.currentHeight),
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
  },
  menuImage: {
    width: 20,
    height: 20,
    tintColor: Color.assetColor,
  },
  backImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
  },
  backImage: {
    width: 18,
    height: 18,
    tintColor: Color.assetColor,
  },
  headerText: {
    fontSize: 17,
    color: Color.assetColor,
    fontFamily: Constants.boldFont,
    textAlign: 'center',
    letterSpacing: 0.3,
    marginLeft: 10,
  },
  homeKidImage: {
    width: 150,
    height: 120,
    position: 'absolute',
    right: 0,
  },
  innerTopImage: {
    width: 90,
    height: 80,
    position: 'absolute',
    right: 20,
  },

});
