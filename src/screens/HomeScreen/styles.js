import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Color, Styles, Constants } from "@common";

export default StyleSheet.create({
  mainBackground: {
    width: '100%',
    height: '100%'
  },
  mainContainer: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },

  firstElementContainer: {
    // backgroundColor: 'pink'
  },
  firstElementText: {
    fontSize: 25,
    color: Color.mainColor,
    fontFamily: Constants.boldFont,
    // textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 15,
  },

  itemMainContainer: {
    width: Styles.width * 0.42,
    height: 150,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 10,
    // paddingHorizontal: 15,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // backgroundColor:'rgba(0,0,0,0.2)',
  },
  itemImage: {
    // flex:0.5,
    width: 70,
    height: 60,
    // backgroundColor:'red'
  },
  itemTextContainer: {
    // flex:0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    // backgroundColor:'pink'
  },
  itemMainText: {
    fontSize: 17,
    color: Color.white,
    fontFamily: Constants.mediumFont,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  itemSubText: {
    fontSize: 15,
    color: Color.white,
    fontFamily: Constants.mediumFont,
    textAlign: 'center',
    marginTop: 2,
  },

  selectLangContainer: {
    flexDirection: 'row',
    backgroundColor: Color.mainColor,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    top: Platform.OS === "ios" ? 0 : (StatusBar.currentHeight),
    left: 16 + 40 + 10, // header icon padding + icon width + extra space
  },
  langIcon: {
    flex: 0.3,
    width: 30,
    height: 30,
    // marginRight: 15,
  },
  langText: {
    flex: 0.5,
    fontSize: 15,
    color: Color.white,
    fontFamily: Constants.mediumFont,
    textAlign: 'center',
    // paddingHorizontal: 6,
  },
  downIcon: {
    flex: 0.2,
    width: 20,
    height: 20,
    tintColor: Color.white,
    // marginLeft: 5,
  },

  buyPremiumMainContainer:{
    marginTop:30,
    marginLeft: 16,
    justifyContent: "center",
    // alignItems: 'center',
  },
  buyPremiumContainer: {
    width: 240,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a5863',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buyPremiumIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  buyPremiumText: {
    fontSize: 14,
    color: Color.white,
    fontFamily: Constants.bookFont,
    textAlign: 'center',
  },
});
