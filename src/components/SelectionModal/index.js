import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Modal, StatusBar } from "react-native";
import { Color, Constants, Languages, Images } from "@common";

const { width, height } = Dimensions.get("window");

const SelectionModal = (props, ref) => {

  const [isVisible, setVisible] = useState(false);
  const [datalist, setDataList] = useState([]);
  const [mainList, setMainList] = useState([]);
  const [title, setTitle] = useState('');
  const [listType, setListType] = useState('single');
  const [dataType, setDataType] = useState('');
  const [selectedVal, setSelectedVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  useImperativeHandle(ref, () => ({
    openModal
  }));
  const openModal = (title, datalist, listType, dataType, selectedVal) => {
    let showSearch = false;
    if (dataType === 'currentCountry') {
      showSearch = true;
    }
    setVisible(true);
    setDataList(datalist);
    setMainList(datalist);
    setTitle(title);
    setListType(listType);
    setDataType(dataType);
    setSelectedVal(selectedVal);

    setShowSearch(showSearch);
  }

  const onItemClick = (item) => {
    setSearchVal('');
    setVisible(false);
    props.selectedItem(item, dataType);
  }

  const onSearchChange = (searchVal) => {
    // const { datalist, mainList } = this.state;
    const newList = mainList.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(searchVal.toLowerCase())));
    setSearchVal(searchVal);
    setDataList(newList);
  }
  const onSearchSubmit = () => {
    // const { datalist, mainList} = this.state;
    // const newList = mainList.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(this.state.searchVal.toLowerCase())));
    // this.setState({ datalist: newList});
  }
  const onCloseClick = () => {
    setSearchVal('');
    setDataList(mainList);
    // this.setState({ searchVal: '', datalist: this.state.mainList }) 
  }

  const onMultiItemRender = ({ item, index }) => {
    return (
      <View style={styles.multiListItemContainer} >
        <View style={styles.multiListItemTextContainer}>
          <View style={styles.multiListTitleContainer}>
            <Text style={styles.multiListTitleText}>{item}</Text>
          </View>
        </View>
        <FlatList
          style={{ flexGrow: 1 }}
          data={datalist[item]}
          extraData={props}
          keyExtractor={(item, index) => index.toString()}
          renderItem={onItemRender}
        />
      </View>
    )
  }
  const onItemRender = ({ item, index }) => {
    let value = '';
    if (typeof (item) === 'object') {
      value = item.name;
    } else {
      value = item;
    }

    let radioIcon = Images.radio_inactive;
    if (value.toLowerCase() === selectedVal.toLowerCase()) {
      radioIcon = Images.radio_active;
    }
    if (dataType === 'phoneCode' && item.phoneCode === selectedVal) {
      radioIcon = Images.radio_active;
    }

    return (
      <TouchableOpacity style={styles.listItemContainer} onPress={() => onItemClick(item)}>
        <View style={styles.listItemTextContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{value}</Text>
          </View>
        </View>
        <View style={styles.listItemImageContainer}>
          <Image source={radioIcon} style={styles.listItemImage} resizeMode={'contain'} />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <Modal
      visible={isVisible}
      // coverScreen={true}
      transparent={true}
      // hasBackdrop={false}
      backdropOpacity={0.4}
      style={styles.modalMainView}
      onBackdropPress={() => setVisible(false)}
      useNativeDriver={true}
    >
      <View style={styles.modalDataContainer}>
        <StatusBar translucent backgroundColor="transparent" hidden />
        <View style={styles.modalInnerDataContainer}>

          <TouchableOpacity style={styles.closePopupContainer} onPress={() => setVisible(false)}>
            <Image source={Images.close} style={styles.closePopupIcon} resizeMode={'contain'} />
          </TouchableOpacity>

          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitleText}>{title}</Text>
          </View>
          {showSearch &&
            <View style={styles.searchViewContainer}>
              <View style={styles.searchInputWrap}>
                <TextInput
                  style={styles.searchInput}
                  underlineColorAndroid='transparent'
                  placeholder={Languages.search}
                  placeholderTextColor={'#808080'}
                  onChangeText={onSearchChange}
                  returnKeyType='go'
                  onSubmitEditing={() => onSearchSubmit()}
                  value={searchVal}
                />
              </View>
              {searchVal.length > 0 &&
                <TouchableOpacity style={styles.closeIconContainer} onPress={() => onCloseClick()}>
                  <Image source={Images.close} style={styles.closeIcon} resizeMode={'contain'} />
                </TouchableOpacity>
              }
            </View>
          }
          {listType === 'single' ?
            <FlatList
              style={[styles.listStyle, { marginTop: 10 }]}
              data={datalist}
              extraData={props}
              keyExtractor={(item, index) => index.toString()}
              renderItem={onItemRender}
            />
            :
            <FlatList
              style={styles.listStyle}
              data={Object.keys(datalist)}
              extraData={props}
              keyExtractor={(item, index) => index.toString()}
              renderItem={onMultiItemRender}
            />
          }
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalMainView: {
  },
  modalDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalInnerDataContainer: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: Color.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // marginVertical: 50,
  },
  closePopupContainer: {
    position: "absolute",
    right: -10,
    top: -15,
  },
  closePopupIcon: {
    width: 40,
    height: 40,
  },
  modalTitleContainer: {
    marginBottom: 10,
    padding: 10,
  },
  modalTitleText: {
    fontSize: 16,
    color: Color.mainColor,
    fontFamily: Constants.boldFont,
    letterSpacing: 0.33,
  },
  listContainer: {
    flex: 1,
  },
  listStyle: {
    margin: 0,
  },
  listItemContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#C8C7CC',
  },
  listItemImageContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  listItemImage: {
    width: 20,
    height: 20,
  },
  listItemTextContainer: {
    flex: 0.9,
  },
  nameContainer: {
    height: 30,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    color: Color.mainColor,
    fontFamily: Constants.bookFont,
    letterSpacing: 0.33,
  },

  multiListItemContainer: {
    flex: 1,
  },
  multiListItemTextContainer: {

  },
  multiListTitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  multiListTitleText: {
    fontSize: 14,
    color: Color.mainColor,
    fontFamily: Constants.boldFont,
    letterSpacing: 0.33,
  },

  searchViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F1F6',
    borderRadius: 14,
  },
  searchInputWrap: {
    flex: 1,
    height: 40,
    // backgroundColor: '#F2F1F6',
    // borderRadius: 14,
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    color: Color.mainColor,
    fontSize: 14,
    opacity: 0.5,
    paddingHorizontal: 18,
    letterSpacing: 0.5,
    fontFamily: Constants.bookFont,
    alignItems: 'center',
  },
  closeIconContainer: {
    marginRight: 10,
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
});
export default forwardRef(SelectionModal);