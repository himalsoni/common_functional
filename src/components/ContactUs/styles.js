
import { StyleSheet } from 'react-native';
import { Color, Constants } from '@common';

export default StyleSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 40,
  },
  imageContainer: {

  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },

  contentContainer: {
    // flex: 1,
    marginHorizontal: 25,
    // backgroundColor:"pink"
  },
  contentTextContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  contentTitleText: {
    fontSize: 16,
    color: Color.mainColor,
    fontFamily: Constants.boldFont,
  },
  contentDescText: {
    fontSize: 13,
    color: Color.mainColor,
    fontFamily: Constants.bookFont,
    letterSpacing: 0.4,
    opacity: 0.5,
    marginTop: 10,
  },
  titleView: {
    height: 60,
    marginTop: 10,
  },
  messageView: {
    height: 100,
  },

  bottomContainer: {
    alignItems: 'center',
    // backgroundColor: Color.assetColor,
    marginTop: 30,
  },
  btnContainer: {
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Color.assetColor,
  },
  authBottomBtnText: {
    color: Color.white,
    fontFamily: Constants.boldFont,
    fontSize: 15,
    lineHeight: 17,
    textTransform: 'uppercase',
  },

});
