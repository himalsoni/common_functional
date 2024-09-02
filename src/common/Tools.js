/**
 * Created for storing common functions of the application
 *
 * @format
 */

import { PixelRatio, Linking } from "react-native";
import _EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
export const EventEmitter = new _EventEmitter();
import Constants from "./Constants";
import Color from "./Color";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from "./AppConfig";
// import { useNavigation, CommonActions  } from '@react-navigation/native';


export async function logout(props) {
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => console.log('successfuly removed all asyncdata'));

  // const navigation = useNavigation();
  // log('-props----------------4')
  // log(props)
  props.navigation.reset({
    index: 0,
    routes: [{ name: 'LoginScreen' }],
  });
  // navigation.dispatch(
  //   CommonActions.reset({
  //     index: 0,
  //     routes: [
  //       { name: 'LoginScreen' },
  //     ],
  //   })
  // );

}

export async function clearAsyncData() {
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => console.log('successfuly removed all asyncdata'));

  // try {
  //   await AsyncStorage.removeItem('@userId');
  //   await AsyncStorage.removeItem('@subUserId');
  //   await AsyncStorage.removeItem('@subUserId');
  //   // return true;
  // }
  // catch (exception) {
  //   // return false;
  // }
}

export function toast(msg, duration = 2500) {
  EventEmitter.emit('toast', msg, duration, 'top');
}

export function log(message, data = {}) {
  console.log(message, data);
  Bugfender.log(message, data);
}

export const FontScalling = (size, scale) => {
  if (PixelRatio.get() < 2) {
    size = size - scale;
  }
  return size;
}

export const isMobileValid = (mobile) => {
  let isValid = true;
  if (mobile.trim().length < 10) {
    isValid = false;
  }
  return isValid;
}

export const isEmailValid = (email) => {
  let isValid = true;
  const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  if (!pattern.test(email)) {
    isValid = false;
  }
  return isValid;
}

export function capitalizeFirstLetter(string) {
  if (string == undefined && string == null) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function checkBlankTextValue(text) {
  if (text !== null && text !== '' && text !== undefined) {
    return text;
  } else {
    return '-';
  }
}

export const isPwdValid = (pwd) => {
  if (pwd.length < 8) {
    return "Your password must be at least 8 characters";
  }
  if (pwd.search(/[A-Z]/g) < 0) {
    return "Your password must contain at least one capital letter.";
  }
  if (pwd.search(/[a-z]/g) < 0) {
    return "Your password must contain at least one small letter.";
  }
  if (pwd.search(/[0-9]/g) < 0) {
    return "Your password must contain at least one digit.";
  }
  return "";
}
