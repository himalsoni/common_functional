import { StyleSheet } from "react-native";
import { Color, Constants, Styles } from "@common";

export default StyleSheet.create({
  mainBackground: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
  },

  dataContainer: {
    alignItems: 'center',
  },
  titleContainer: {
  },
  titleText: {
    fontSize: 40,
    color: Color.mainColor,
    fontFamily: Constants.bubblegumSans,
    textAlign: 'center',
    marginBottom: 20,
  },

  selectLangContainer: {
    flexDirection: 'row',
    backgroundColor: Color.mainColor,
    width: 250,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  langIcon: {
    flex: 0.3,
    width: 30,
    height: 30,
    // marginRight: 15,
  },
  langText: {
    flex: 0.6,
    fontSize: 15,
    color: Color.white,
    fontFamily: Constants.mediumFont,
    textAlign: 'center',
    // paddingHorizontal: 6,
  },
  downIcon: {
    flex: 0.3,
    width: 20,
    height: 20,
    tintColor: Color.white,
    // marginLeft: 5,
  },

  inputContainer: {
    flexDirection: "row",
    width: 250,
    height: 47,
    backgroundColor: Color.mainColor,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
  },
  mobileCodeContainer: {
    height: 47,
    width: 60,
    backgroundColor: Color.mainColor,
    borderRightWidth: 0.2,
    borderColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  mobileCodeText: {
    color: Color.white,
    fontSize: 14,
    fontFamily: Constants.boldFont,
  },
  mobileInput: {
    flex: 1,
    color: Color.white,
    fontSize: 14,
    paddingHorizontal: 10,
    letterSpacing: 0.5,
    fontFamily: Constants.mediumFont,
  },

  googleBtn: {
    alignSelf: 'center',
    width: 250,
    height: 55,
    marginTop: 10,
  },

  //splash
  sunContainer: {
    alignItems: "flex-end",
    paddingRight: 15,
  },
  sunImage: {
    width: 150,
    height: 150,
  },
  kidsMainContainer: {
    marginTop: -150,
  },
  branchImage: {
    width: Styles.width * 0.80,
  },
  kidsImage: {
    width: Styles.width * 0.80,
    marginTop: -110,
    marginLeft: 15,
  },
});
