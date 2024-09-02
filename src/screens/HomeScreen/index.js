import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, TouchableOpacity, ImageBackground, StatusBar } from "react-native";
import styles from "./styles";
import { log, toast, playAppSound } from "@common/Tools";
import { Images, Styles, Constants, Languages } from "@common";
import { Spinner, CommonHeader, SubscriptionOfferPopup, SelectionModal } from '@components';
import { useSelector, useDispatch } from 'react-redux'
const { getMasterCategories } = require("@redux/MasterCategoryRedux");
import SideMenu from './SideMenu';
import MasonryList from '@react-native-seoul/masonry-list';
const { changeLanguage } = require("@redux/UserRedux");
import * as Animatable from 'react-native-animatable';

const HomeScreen = (props) => {
  const configState = useSelector(state => state.appConfig.appConfigResult)
  const state = useSelector(state => state.masterCategory)
  const userState = useSelector(state => state.user)
  const dispatch = useDispatch()
  let modalRef = useRef();

  const [isLoading, setIsLoading] = useState(Object.keys(state.masterCategoriesResult).length === 0 ? true : false);
  const [list, setList] = useState(Object.keys(state.masterCategoriesResult).length === 0 ? state.masterCategoriesResult.masterCategories : []); //myList.map(a => Object.assign({}, a))
  const [isRefreshing, setIsRefreshig] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [greetingMsg, setGreetingMsg] = useState('Good Morning..!!');
  const [showSubscriptionOfferPopup, seShowSubscriptionOfferPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(userState.userConfigResult.language);

  useEffect(() => {
    if (Object.keys(state.masterCategoriesResult).length === 0) {
      setIsLoading(true)
    } else {
      setIsLoading(true)
    }
    displayGreeting();
    fetchData();
  }, []);
  async function fetchData() {
    dispatch(getMasterCategories(dispatch))
  }
  const onRefresh = () => {
    fetchData();
  }
  useEffect(() => {
    // log('================state masterCategories===================')
    // log(state.type)
    if (state.error !== null && state.type === "GET_MASTER_CATEGORY_FAILURE") {
      // toast(state.error);
      log(state.type + ' --> ' + state.error);
      setIsLoading(false)
    }
    if (state.type === "GET_MASTER_CATEGORY_SUCCESS") {
      setList(state.masterCategoriesResult.masterCategories)
      setIsLoading(false)
    }
  }, [state.error, state.type])

  const displayGreeting = () => {
    const myDate = new Date();
    const hrs = myDate.getHours();
    if (hrs < 12)
      setGreetingMsg('Good Morning..!!')
    else if (hrs >= 12 && hrs <= 17)
      setGreetingMsg('Good Afternoon..!!')
    else if (hrs >= 17 && hrs <= 24)
      setGreetingMsg('Good Evening..!!')
  }

  const selectedPopupItem = (item, dataType) => {
    if (dataType === 'language') {
      setSelectedLanguage(item)
      userState.userConfigResult.language = item;
      setIsLoading(true)
      dispatch(changeLanguage(dispatch, item))
    }
  }
  useEffect(() => {
    if (userState.error !== null && userState.type === "CHANGE_LANGUAGE_FAILURE") {
      log(state.type + ' --> ' + state.error);
    }
    if (userState.type === "CHANGE_LANGUAGE_SUCCESS") {
      fetchData();
    }
  }, [userState.error, userState.type])

  const onItemClick = (item) => {
    
  }

  const onItemRender = ({ item, index }) => {
    return (
      <TouchableOpacity style={item.masterCatId === 101 ? styles.firstElementContainer : [styles.itemMainContainer, { backgroundColor: item.color }]} onPress={() => onItemClick(item)}>
        <View style={styles.itemContainer}>
          {item.masterCatId !== 101 &&
            <Image style={styles.itemImage} source={{ uri: item.image }} resizeMode="contain" />
          }
          <View style={styles.itemTextContainer}>
            {item.masterCatId === 101 ?
              <Text style={styles.firstElementText}>{greetingMsg}</Text>
              :
              <Text style={styles.itemMainText}>{item.mainText}</Text>
            }
            {item.subText !== '' && item.subText !== null &&
              <Text style={styles.itemSubText}>{item.subText}</Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ImageBackground source={Images.background4} style={styles.mainBackground} >
      <View style={styles.mainContainer}>
        <StatusBar translucent backgroundColor="transparent" hidden />
        {/*header container */}
        <CommonHeader title={''} homekid rightImage={Images.home_kid} onLeftIconClick={() => { setShowSideMenu(true); playAppSound(Constants.allBtnClickUrl); }} />

        {/** select laguage */}
        {configState.isLanguageEnabled &&
          <TouchableOpacity style={styles.selectLangContainer} onPress={() => modalRef.current.openModal(Languages.selectLanguage, configState?.languages, 'single', 'language', selectedLanguage)}>
            <Image style={styles.langIcon} source={Images.languages} resizeMode="contain" />
            <Text style={styles.langText} numberOfLines={1}>{selectedLanguage}</Text>
            <Image style={styles.downIcon} source={Images.downArrow} resizeMode="contain" />
          </TouchableOpacity>
        }
        {/** go for premium */}
        {!isLoading && !userState.userConfigResult.isPayment &&
          <Animatable.View
            // delay={10000}
            animation="slideInLeft"
            direction="alternate"
            duration={2000}
            // easing="ease-out"
            iterationCount="infinite"
            useNativeDriver={true}
            style={styles.buyPremiumMainContainer}>

            <TouchableOpacity style={styles.buyPremiumContainer} onPress={() => props.navigation.navigate("SubscriptionScreen")}>
              <Image style={styles.buyPremiumIcon} source={Images.crown} resizeMode="contain" />
              <Text style={styles.buyPremiumText} numberOfLines={1}>{Languages.homeBuyPremium}</Text>
            </TouchableOpacity>

          </Animatable.View>
        }

        {/*list content*/}
        <View style={styles.listContainer}>
          {list !== undefined && list.length > 0 ?
            <MasonryList
              data={list}
              keyExtractor={(item, index) => 'Home_' + item.masterCatId.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={onItemRender}
              onRefresh={() => onRefresh()}
              refreshing={isRefreshing}
            />
            :
            <>
              {!isLoading &&
                <View style={Styles.noDataImageConatiner}>
                  <Image source={Images.no_property} style={Styles.noDataIcon} resizeMode={'contain'} />
                </View>
              }
            </>
          }
        </View>
      </View>
      {isLoading &&
        <Spinner type={'normal'} />
      }
      {showSideMenu &&
        <SideMenu navigation={props.navigation} onMenuClose={() => setShowSideMenu(false)} />
      }
      {showSubscriptionOfferPopup &&
        <SubscriptionOfferPopup image={Images.congo} onSubscriptionOfferClick={() => { seShowSubscriptionOfferPopup(false); props.navigation.navigate("SubscriptionScreen") }} onPopupBackClick={() => seShowSubscriptionOfferPopup(false)} />
      }
      <SelectionModal ref={modalRef} selectedItem={(item, dataType) => selectedPopupItem(item, dataType)} />
    </ImageBackground>
  );
}
export default HomeScreen;
