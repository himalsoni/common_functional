import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, StatusBar, ImageBackground, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { toast, log, isMobileValid, playAppSound } from "@common/Tools";
import { Images, Languages, Constants } from "@common";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectionModal, Spinner } from '@components';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useDeviceName, getVersion, getSystemVersion, getSystemName } from 'react-native-device-info';
import * as Animatable from 'react-native-animatable';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux'
const { login, getUserConfig, clearReduxType } = require("@redux/UserRedux");

// {"idToken": null, "scopes": ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"], "serverAuthCode": null, "user": {"email": "himal.orafox@gmail.com", "familyName": "Soni", "givenName": "Himal", "id": "113661362687973135750", "name": "Himal Soni", "photo": "https://lh3.googleusercontent.com/a-/AOh14Gijsvx0cGNDUj4Mg-8HheruGOmihivcdoUy3pLC"}}
const LoginScreen = (props) => {
  const state = useSelector(state => state.user)
  const configStateData = useSelector(state => state.appConfig)
  const configState = useSelector(state => state.appConfig.appConfigResult)
  const dispatch = useDispatch()

  log('configState.isMobileEnabled->>> ' + configState.isMobileEnabled)
  let modalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(false);
  const [isSigninInProgress, setIsSignninProgress] = useState(configState.isMobileEnabled);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState('+91');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const { loading, result } = useDeviceName();

  useEffect(() => {
    async function fetchData() {
      await GoogleSignin.configure();
    }
    const checkToken = async () => {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        setFcmToken(fcmToken)
      }
    }
    fetchData();
    checkToken();
    // return () => {
    //   keyboardDidHideListener.remove();
    //   keyboardDidShowListener.remove();
    // };
  }, []);

  useEffect(() => {
    if (configStateData.type === "APP_CONFIG_SUCCESS") {
      setIsSignninProgress(configStateData.appConfigResult.isMobileEnabled)
    }
  }, [configStateData.error, configStateData.type])

  signIn = async () => {
    playAppSound(Constants.allBtnClickUrl);
    setIsLoading(true);
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      log('login success')
      // log(userInfo)
      callLoginApi(userInfo);
      try {
        await AsyncStorage.setItem('@userEmail', userInfo.user.email);
        await AsyncStorage.setItem('@userName', userInfo.user.name);
      } catch (e) {
        log('async storage error while storing useremail name info')
      }
    } catch (error) {
      setIsLoading(false);
      log('----login error----')
      log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  callLoginApi = async (userInfo) => {
    const loginObj = {
      "phoneCode": selectedPhoneCode,
      "mobile": mobile,
      "emailId": userInfo.user.email,
      "name": userInfo.user.name,
      "profilePath": userInfo.user.photo,
      "appVersion": getVersion(),
      "deviceName": result,
      "deviceVersion": getSystemVersion(),
      "osType": getSystemName(),
      "fcmToken": fcmToken,
      "language": selectedLanguage
    }
    dispatch(login(dispatch, loginObj))
  }
  useEffect(() => {
    // log('************* login ******************')
    // log(state)
    if (state.error !== null && (state.type === "LOGIN_USER_FAILURE" || state.type === "USER_CONFIG_FAILURE")) {
      // toast(state.error);
      log(state.type + ' --> ' + state.error);
      setIsLoading(false)
    }
    if (state.type === "LOGIN_USER_SUCCESS") {
      let userID = state.loginResult.userId;
      try {
        AsyncStorage.setItem('@userId', userID);
      } catch (e) {
        log('async storage error while storing userId info')
      }

      const obj = {
        "userId": userID,
        "fcmToken": fcmToken
      }
      dispatch(getUserConfig(dispatch, obj))
    }
    if (state.type === "USER_CONFIG_SUCCESS") {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
      setIsLoading(false);
      dispatch(clearReduxType(dispatch))
    }
  }, [state.error, state.type])

  const selectedPopupItem = (item, dataType) => {
    if (dataType === 'phoneCode') {
      setSelectedPhoneCode(item.phoneCode);
    } else if (dataType === 'language') {
      setSelectedLanguage(item)
    }
  }
  onMobileSubmit = () => {
    if (mobile.trim() !== "") {
      if (isMobileValid(mobile)) {
        setMobileError(false);
        setIsSignninProgress(false);
      } else {
        toast(Languages.mobileValidError);
      }
    } else {
      toast(Languages.mobileError);
    }
  }

  return (
    <ImageBackground source={Images.background4} style={styles.mainBackground} resizeMode="stretch">
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" hidden />

        <KeyboardAvoidingView style={styles.contentContainer}>

          <Animatable.View
            animation="tada"
            // delay={1000}
            duration={3000}
            easing="ease-in"
            iterationCount="infinite"
            useNativeDriver={true}
            style={styles.sunContainer} >
            <Image style={styles.sunImage} source={Images.sun} resizeMode="contain" />
          </Animatable.View>

          <View style={styles.kidsMainContainer}>
            <Image style={styles.branchImage} source={Images.branch} resizeMode="contain" />
            <Animatable.View
              animation="pulse"
              duration={3000}
              // easing="ease-in"
              iterationCount="infinite"
              useNativeDriver={true} >
              <Image style={styles.kidsImage} source={Images.kids} resizeMode="contain" />
            </Animatable.View>
          </View>

          <ScrollView contentContainerStyle={styles.dataContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{Languages.appNameDivided}</Text>
            </View>

            {configState.isMobileEnabled &&
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.mobileCodeContainer} onPress={() => modalRef.current.openModal(Languages.selectPhoneCode, configState.countries, 'single', 'phoneCode', selectedPhoneCode)}>
                  <Text style={[styles.mobileCodeText, { opacity: selectedPhoneCode === '' ? 0.4 : 0.8 }]}>{selectedPhoneCode === '' ? Languages.defaultSelectedCode : selectedPhoneCode}</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.mobileInput}
                  underlineColorAndroid="transparent"
                  placeholder={Languages.enterMobile}
                  onChangeText={(value) => {
                    value = value.replace(/[^0-9]/g, "");
                    setMobile(value)
                    if (value.trim().length == 10) {
                      setIsSignninProgress(false);
                    } else {
                      setIsSignninProgress(true);
                    }
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => onMobileSubmit()}
                  value={mobile}
                  maxLength={10}
                  keyboardType={"numeric"}
                  placeholderTextColor="white"
                />
              </View>
            }

            {configState.isLanguageEnabled &&
              <TouchableOpacity style={styles.selectLangContainer} onPress={() => modalRef.current.openModal(Languages.selectLanguage, configState?.languages, 'single', 'language', selectedLanguage)}>
                <Image style={styles.langIcon} source={Images.languages} resizeMode="contain" />
                <Text style={styles.langText} numberOfLines={1}>{selectedLanguage === '' ? Languages.selectLanguage : selectedLanguage}</Text>
                <Image style={styles.downIcon} source={Images.downArrow} resizeMode="contain" />
              </TouchableOpacity>
            }

            <GoogleSigninButton
              style={styles.googleBtn}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
              disabled={isSigninInProgress}
            />
          </ScrollView>
        </KeyboardAvoidingView>

        {isLoading &&
          <Spinner type={'normal'} />
        }
      </View>
      <SelectionModal ref={modalRef} selectedItem={(item, dataType) => selectedPopupItem(item, dataType)} />
    </ImageBackground>
  );
}
export default LoginScreen;
