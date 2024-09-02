import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from './styles';
import { log } from '@common/Tools';
import { Languages, Color, Images } from '@common';
import { FloatingLabel } from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
const { contactUs } = require("@redux/ContactUsRedux");

const ContactUs = (props) => {
  const state = useSelector(state => state.contactUs)
  const userState = useSelector(state => state.user.userConfigResult)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isBtnEnabled, setIsBtnEnabled] = useState(false);

  const onTitleChange = (title) => {
    setTitle(title)
    if (title.trim() !== '') {
      checkForEnableBtn();
    }
  }
  const onMessageChange = (message) => {
    setMessage(message)
    if (message.trim() !== '') {
      checkForEnableBtn();
    }
  }
  const checkForEnableBtn = () => {
    if (message.trim() !== '' && title.trim() !== '') {
      setIsBtnEnabled(true);
    } else {
      setIsBtnEnabled(false);
    }
  }

  const onSend = async () => {
    if (title !== "" && message !== "") {
      props.setLoader(true)

      const userId = await AsyncStorage.getItem('@userId');
      const obj = {
        "userId": userId,
        "title": title,
        "message": message
      }
      // log('----contactus---')
      // log(obj)
      dispatch(contactUs(dispatch, obj))
    }
  }
  useEffect(() => {
    // log('================state ContactUs===================')
    // log(state.type)
    if (state.error !== null && state.type === "CONTACT_US_FAILURE") {
      setIsLoading(false)
      log(state.type + ' --> ' + state.error);
    }
    if (state.type === "CONTACT_US_SUCCESS") {
      Alert.alert(Languages.appName, state.contactUsResult.message);
      setTitle('')
      setMessage('')
      setIsBtnEnabled(false)

      props.setLoader(false)
    }
  }, [state.error, state.type])

  const ref_message = useRef();

  return (
    <ScrollView style={styles.mainContainer}>
      {/*content view*/}
      {/* form container */}
      <View style={styles.imageContainer}>
        <Image source={Images.contact_us} style={styles.image} resizeMode={'contain'} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentTextContainer}>
          <Text style={styles.contentTitleText}>{Languages.helpNsupport}</Text>
          <Text style={styles.contentDescText}>{Languages.helpMsg}</Text>
        </View>
        {/*title container*/}
        {/* name */}
        <View style={styles.titleView}>
          <FloatingLabel
            placeholder={Languages.title + '*'}
            onChangeTextValue={onTitleChange}
            value={title}
            multiline={false}
            returnKeyType="next"
            isRequired={true}
            autoFocus={true}
            maxLength={50}
            onSubmitEditing={() => ref_message.current.focus()}
          />
        </View>
        {/*message container*/}
        <View style={styles.messageView}>
          <FloatingLabel
            placeholder={Languages.typeYourMsg + '*'}
            onChangeTextValue={onMessageChange}
            value={message}
            returnKeyType="done"
            multiline={true}
            isRequired={true}
            maxLength={500}
            ref={ref_message}
          />
        </View>
        {/* bottom container */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity disabled={!isBtnEnabled} onPress={onSend} style={[styles.btnContainer, { backgroundColor: isBtnEnabled ? Color.assetColor : Color.disableBtn }]}>
            <Text style={styles.authBottomBtnText}>{Languages.send}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default ContactUs;