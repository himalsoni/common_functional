import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, ImageBackground, Share, Switch } from 'react-native';
import { toast, log, clearAsyncData, playAppSound } from '@common/Tools';
import { Languages, Images, Color, Styles, Constants } from '@common';
import { ContactUs, Spinner, NotificationSend } from '@components';
import { useSelector, useDispatch } from 'react-redux'
const { deleteUser } = require("@redux/UserRedux");
const { subscriptionPaymentLog } = require("@redux/PaymentRedux");
import InAppReview from 'react-native-in-app-review';
const { setAppSound } = require("@redux/AppConfigRedux");

const SideMenu = (props) => {
    const userState = useSelector(state => state.user)
    const appconfigState = useSelector(state => state.appConfig)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const [showMenuBtns, setShowMenuBtns] = useState(true);
    const [showContactUS, setShowContactUS] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isEnabledSound, setIsEnabledSound] = useState(appconfigState.appSound);
    const [showSendNotification, setShowSendNotification] = useState(false);

    const onBackClick = () => {
        if (showMenuBtns) {
            props.onMenuClose()
        } else {
            setShowMenuBtns(true)
            setShowContactUS(false)
            setShowSendNotification(false)
        }
    }
    const onShareApp = () => {
        playAppSound(Constants.allBtnClickUrl);
        try {
            Share.share({
                title: Languages.appName,
                message: "Hey there!\nHave you checked this awesome app",
            });
        } catch (error) {
            log(error.message);
        }
    }
    const onContactUs = () => {
        playAppSound(Constants.allBtnClickUrl);
        setShowMenuBtns(false)
        setShowContactUS(true)
    }
    const onLogout = async () => {
        playAppSound(Constants.allBtnClickUrl);
        dispatch(subscriptionPaymentLog(dispatch, Constants.logout))
        setIsLoading(false)
        clearAsyncData();
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
        });
    }
    const onDeleteAcc = () => {
        playAppSound(Constants.allBtnClickUrl);
        setShowDeleteConfirm(true)
    }
    const onYesDeleteAcc = () => {
        playAppSound(Constants.allBtnClickUrl);
        setIsLoading(true)
        dispatch(deleteUser(dispatch))
    }
    const onCancelDeleteAcc = () => {
        playAppSound(Constants.allBtnClickUrl);
        setShowDeleteConfirm(false)
    }
    const onRateUS = () => {
        InAppReview.RequestInAppReview()
            .then((hasFlowFinishedSuccessfully) => {
                // when return true in android it means user finished or close review flow
                console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                // when return true in ios it means review flow lanuched to user.
                console.log(
                    'InAppReview in ios has launched successfully',
                    hasFlowFinishedSuccessfully,
                );

                // 1- you have option to do something ex: (navigate Home page) (in android).
                // 2- you have option to do something,
                // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                // 3- another option:
                if (hasFlowFinishedSuccessfully) {
                    // do something for ios
                    // do something for android
                }

                // for android:
                // The flow has finished. The API does not indicate whether the user
                // reviewed or not, or even whether the review dialog was shown. Thus, no
                // matter the result, we continue our app flow.

                // for ios
                // the flow lanuched successfully, The API does not indicate whether the user
                // reviewed or not, or he/she closed flow yet as android, Thus, no
                // matter the result, we continue our app flow.
            })
            .catch((error) => {
                //we continue our app flow.
                // we have some error could happen while lanuching InAppReview,
                // Check table for errors and code number that can return in catch.
                console.log(error);
            });
    }
    const toggleSwitch = () => {
        playAppSound(Constants.allCategoryClickUrl);
        setIsEnabledSound(previousState => !previousState);
        dispatch(setAppSound(dispatch, !isEnabledSound));
    }
    const onSendNotification = () => {
        playAppSound(Constants.allBtnClickUrl);
        setShowMenuBtns(false)
        setShowSendNotification(true)
    }

    useEffect(() => {
        // log('=====================userState data==================')
        // log(userState);
        if (userState.error !== null && userState.type === "DELETE_USER_FAILURE") {
            // toast(userState.error);
        }
        if (userState.type === "DELETE_USER_SUCCESS") {
            onLogout()
        }
    }, [userState.error, userState.type])

    return (
        <ImageBackground source={Images.background4}>
            <View style={styles.menuContainer}>
                {/** header */}
                <View style={styles.headerContainer}>
                    <View style={styles.headerBtnContainer}>
                        <TouchableOpacity style={styles.menuImageContainer} onPress={onBackClick}>
                            <Image style={styles.menuImage} source={Images.back} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Image style={styles.homeKidImage} source={Images.home_kid} resizeMode="contain" />
                </View>
                {showMenuBtns &&
                    <>
                        {/** rate us 
                        <TouchableOpacity style={styles.menuItemContainer} onPress={onRateUS}>
                            <Image style={styles.menuItemIcon} source={Images.star} resizeMode="contain" />
                            <Text style={styles.menuBtnText}>{Languages.rateus}</Text>
                        </TouchableOpacity>*/}
                        {/** shareApp */}
                        <TouchableOpacity style={styles.menuItemContainer} onPress={onShareApp}>
                            <Image style={styles.menuItemIcon} source={Images.share} resizeMode="contain" />
                            <Text style={styles.menuBtnText}>{Languages.shareApp}</Text>
                        </TouchableOpacity>
                        {/** sound of app */}
                        <TouchableOpacity style={styles.menuItemContainer} onPress={onShareApp}>
                            <Image style={styles.menuItemIcon} source={Images.sound} resizeMode="contain" />
                            <Text style={styles.menuBtnText}>{Languages.sound}</Text>
                            <Switch
                                style={styles.switchContainer}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabledSound ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabledSound}
                            />
                        </TouchableOpacity>
                        {/** contactUs */}
                        <TouchableOpacity style={styles.menuItemContainer} onPress={onContactUs}>
                            <Image style={styles.menuItemIcon} source={Images.call} resizeMode="contain" />
                            <Text style={styles.menuBtnText}>{Languages.contactUs}</Text>
                        </TouchableOpacity>
                        {/** SubscriptionScreen */}
                        {!userState.userConfigResult.isPayment &&
                            <TouchableOpacity style={styles.menuItemContainer} onPress={onSubscription}>
                                <Image style={styles.menuItemIcon} source={Images.privacypolicy} resizeMode="contain" />
                                <Text style={styles.menuBtnText}>{Languages.subscriptionScreen}</Text>
                            </TouchableOpacity>
                        }

                        {/** privacyPolicy */}
                        {/* <TouchableOpacity style={styles.menuItemContainer} onPress={onPrivacyPolicy}>
                            <Image style={styles.menuItemIcon} source={Images.privacypolicy} resizeMode="contain" />
                            <Text style={styles.menuBtnText}>{Languages.privacyPolicy}</Text>
                        </TouchableOpacity> */}
                        {/** termsCondition */}
                        {/* <TouchableOpacity style={styles.menuItemContainer} onPress={onTermsCondition}>
                            <Image style={styles.menuItemIcon} source={Images.termscondition} resizeMode="contain" />
                            <Text style={styles.menuBtnText}>{Languages.termsCondition}</Text>
                        </TouchableOpacity> */}

                        {/** send notification */}
                        {userState.userConfigResult.emailId === 'dreamcontent001@gmail.com' &&
                            <TouchableOpacity style={styles.menuItemContainer} onPress={onSendNotification}>
                                <Image style={styles.menuItemIcon} source={Images.notification} resizeMode="contain" />
                                <Text style={styles.menuBtnText}>{Languages.notification}</Text>
                            </TouchableOpacity>
                        }

                        {/** logout */}
                        <TouchableOpacity style={styles.menuItemContainer} onPress={onLogout}>
                            <Image style={styles.menuItemIcon} source={Images.logout} resizeMode="contain" />
                            <Text style={styles.menuBtnText}>{Languages.logout}</Text>
                        </TouchableOpacity>
                    </>
                }
                {showContactUS &&
                    <ContactUs setLoader={(val) => setIsLoading(val)} />
                }
                {showSendNotification &&
                    <NotificationSend setLoader={(val) => setIsLoading(val)} />
                }
                {showMenuBtns &&
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={styles.bottomBtnContainer} onPress={onDeleteAcc}>
                            <Text style={styles.bottomBtnText}>{Languages.deleteAcc}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            {isLoading &&
                <Spinner type={'normal'} />
            }
            {showDeleteConfirm &&
                <View style={styles.confirmPopupMainContainer}>
                    <View style={styles.confirmPopupContainer}>
                        <Text style={styles.confirmPopupTitle}>{Languages.deleteAcc}</Text>
                        <Text style={styles.confirmPopupMsg}>{Languages.confirmPopupMsg}</Text>
                        <View style={styles.confirmPopupBottomView}>
                            <TouchableOpacity style={styles.confirmPopupYes} onPress={onYesDeleteAcc}>
                                <Text style={styles.confirmPopupYesText}>{Languages.yes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmPopupCancel} onPress={onCancelDeleteAcc}>
                                <Text style={styles.confirmPopupCancelText}>{Languages.cancel}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </ImageBackground>
    );
}

export default SideMenu;

const styles = StyleSheet.create({
    menuContainer: {
        width: Styles.width,
        height: '100%',
    },
    headerContainer: {
        marginTop: Platform.OS === "ios" ? 0 : (StatusBar.currentHeight),
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 50,
    },
    headerBtnContainer: {
        flexDirection: 'row',
        // paddingTop: 10,
        // backgroundColor:'red',
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
    homeKidImage: {
        width: 150,
        height: 120,
        position: 'absolute',
        right: 0,
    },

    menuItemContainer: {
        flexDirection: "row",
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: Color.borderColor,
        marginLeft: 75,
        marginRight: 30,
    },
    menuItemIcon: {
        width: 30,
        height: 30,
        tintColor: Color.mainColor,
        marginLeft: -60,
    },
    menuBtnText: {
        fontSize: 17,
        color: Color.textColor,
        fontFamily: Constants.mediumFont,
        marginLeft: 15,
    },

    bottomView: {
        position: 'absolute',
        height: 50,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBtnContainer: {
        width: 170,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Color.mainColor,
        borderRadius: 5,
        // elevation: 1,
    },
    bottomBtnText: {
        fontSize: 14,
        color: Color.mainColor,
        fontFamily: Constants.mediumFont,
    },

    confirmPopupMainContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    confirmPopupContainer: {
        backgroundColor: 'white',
        height: 200,
        width: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmPopupTitle: {
        fontSize: 16,
        color: Color.textColor,
        fontFamily: Constants.mediumFont,
    },
    confirmPopupMsg: {
        fontSize: 16,
        color: Color.subTextColor,
        fontFamily: Constants.bookFont,
        marginTop: 20,
    },
    confirmPopupBottomView: {
        flexDirection: 'row',
        marginTop: 30,
    },
    confirmPopupYes: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.mainColor,
        borderRadius: 5,
        elevation: 1,
        marginRight: 10,
    },
    confirmPopupYesText: {
        fontSize: 17,
        color: Color.white,
        fontFamily: Constants.mediumFont,
    },
    confirmPopupCancel: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.mainColor,
        borderRadius: 5,
        elevation: 1,
        marginLeft: 10,
    },
    confirmPopupCancelText: {
        fontSize: 17,
        color: Color.white,
        fontFamily: Constants.mediumFont,
    },

    switchContainer: {
        marginLeft: 10,
    },
});