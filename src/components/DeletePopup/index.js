import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from './styles';
import { log } from '@common/Tools';
import { Languages, Styles } from '@common';

const DeletePopup = (props, ref) => {

  const [inputValue, setInputValue] = useState('');
  const [inputErrorMsg, setInputErrorMsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    openPopup
  }));
  const openPopup = () => {
    setModalVisible(true)
  }
  const onCancel = () => { setModalVisible(false) }
  const onOkClick = () => {
    if (props.showInput && inputValue == '') {
      setInputErrorMsg(props.blankErrorMsg)
      return;
    }
    setModalVisible(false)
    props.okBtnClick();
  }

  return (
    <View style={styles.mainContainer}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.mainContainer}>
          <View style={[styles.innerContainer, { height: props.showInput ? Styles.height * 0.35 : Styles.height * 0.25 }]}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text style={styles.descText}>{props.message}</Text>
            {props.showInput &&
              <View>
                <View style={inputErrorMsg !== '' ? styles.inputWrapError : styles.inputWrap}>
                  <TextInput
                    style={styles.authInput}
                    underlineColorAndroid="transparent"
                    placeholder={props.inputPlaceHolder}
                    placeholderTextColor={'#9e9e9e'}
                    onChangeText={(val) => setInputValue(val)}
                    returnKeyType="next"
                    value={inputValue}
                    maxLength={50}
                  />
                </View>
                {inputErrorMsg !== '' &&
                  <Text style={styles.errorMsg}>{inputErrorMsg}</Text>
                }
              </View>
            }
            {/** save button */}
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelBtnText}>{Languages.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okBtn} onPress={onOkClick}>
                <Text style={styles.okBtnText}>{props.okBtnText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default forwardRef(DeletePopup);