/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Linking, TouchableOpacity, Platform } from 'react-native';
import { Color, Constants, Styles, Images } from '@common';
import { log, toast, playAppSound } from '@common/Tools';

import Navigation from "@navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { MyToast } from '@components';
import { useSelector, useDispatch } from 'react-redux'
const { fetchAppConfig } = require("@redux/AppConfigRedux");
const { getUserConfig, clearReduxType } = require("@redux/UserRedux");
import PushNotification, { Importance } from 'react-native-push-notification';

const Router = (props) => {
	const state = useSelector(state => state.appConfig)
	const userState = useSelector(state => state.user)
	const dispatch = useDispatch()

	const [userIdData, setuserId] = useState('');
	const [isInternetConnected, setIsInternetConnected] = useState(true);
	const [appConfig, setAppConfig] = useState({});
	const [forceupdate, setForceupdate] = useState(false);

	useEffect(() => {
		// SplashScreen.hide();
		const unsubscribe = NetInfo.addEventListener(state => {
			log('***************************************************************************************************************')
			console.log("Connection type", state.type);
			console.log("Is connected?", state.isConnected);
			setIsInternetConnected(state.isConnected)
		});
		const unsubscribeFCM = messaging().onMessage(async remoteMessage => {
			console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

			PushNotification.localNotification({
				/* Android Only Properties */
				channelId: "1", // (required) channelId, if the channel doesn't exist, notification will not trigger.

				/* iOS and Android properties */
				title: remoteMessage.notification.title, // (optional)
				message: remoteMessage.notification.body, // (required)
			});

		});
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			console.log('Message handled in the background!', remoteMessage);
		});

		// --- local notification channel creation
		PushNotification.channelExists('1', function (exists) {
			if (!exists) { // true/false
				PushNotification.createChannel(
					{
						channelId: "1", // (required)
						channelName: "allInOne", // (required)
						channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
						playSound: false, // (optional) default: true
						soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
						importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
						vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
					},
					(created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
				);
			}
		});

		return () => {
			endConnection();
			unsubscribe();
			unsubscribeFCM();
		}
	}, []);

	useEffect(() => {
		// log('=====================state data==================')
		// log(state);

		if (state.error !== null && state.type === "APP_CONFIG_FAILURE") {
			// toast(state.error);
			log(state.type + ' --> ' + state.error);
		}
		if (state.type === "APP_CONFIG_SUCCESS") {
			setAppConfig(state.appConfigResult);
			if (state.appConfigResult.appConfig?.forceUpdateVersion > DeviceInfo.getVersion()) {
				setForceupdate(true);
			}
		}
	}, [state.error, state.type])

	useEffect(() => {
		if (userState.type === "USER_CONFIG_SUCCESS") {
			dispatch(clearReduxType(dispatch))
		}
	}, [userState.error, userState.type])

	useEffect(() => {
		async function fetchAppConfigData() {
			dispatch(fetchAppConfig(dispatch))
		}
		async function fetchData() {
			const userId = await AsyncStorage.getItem('@userId');
			// log('------------- userId -------------')
			// log(userId)
			setuserId(userId)

			if (userId !== '' && userId !== null) {
				const fcmToken = await messaging().getToken();
				const obj = {
					"userId": userId,
					"fcmToken": fcmToken
				}
				dispatch(getUserConfig(dispatch, obj))
			}
		}
		fetchAppConfigData()
		fetchData();
	}, []);

	const onUpdateApp = () => {
		Linking.openURL("market://details?id=com.allinoneforkids.gujarati");
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>

				{isInternetConnected ?
					<>
						{userIdData !== '' ?
							<View style={{ flex: 1 }}>
								<Navigation user={userIdData} />
								<MyToast />
							</View>
							:
							<AnimationComponent />
						}
						{forceupdate &&
							<View style={styles.forceUpdateView}>
								<View style={styles.forceUpdateTextConatiner}>
									{/* <Text style={styles.forceUpdateTitleText}>{Languages.forceUpdateTitle}</Text> */}
									<Image source={Images.updated} style={styles.updatedImage} resizeMode={'center'} />
									<Text style={styles.forceUpdateMsgText}>{Languages.forceUpdateMsg}</Text>
								</View>
								<TouchableOpacity style={styles.forceUpdateBtnView} onPress={onUpdateApp}>
									<Text style={styles.forceUpdateBtnText}>{Languages.update}</Text>
								</TouchableOpacity>
							</View>
						}
						{appConfig.isUnderMaintainance &&
							<View style={styles.underMainContainer}>
								<Image source={Images.underMaintenance} style={styles.underMainImage} resizeMode={'center'} />
								<Text style={styles.underMainText}>{Languages.underMaintenance}</Text>
							</View>
						}
					</>
					:
					<View style={styles.noInternetView}>
						<View style={Styles.noDataImageConatiner}>
							<Image source={Images.no_internet} style={Styles.noDataIcon} resizeMode={'contain'} />
						</View>
					</View>
				}

			</View>
		</GestureHandlerRootView>
	);
}

export default Router;

const styles = StyleSheet.create({
	noInternetView: {
		flex: 1,
		backgroundColor: 'white'
	},
	forceUpdateView: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
		backgroundColor: 'white',
		alignItems: "center",
		justifyContent: 'center',
		paddingHorizontal: 25,
	},
	forceUpdateTextConatiner: {
		alignItems: 'center',
	},
	forceUpdateTitleText: {
		fontSize: 20,
		color: Color.textColor,
		fontFamily: Constants.mediumFont,
	},
	updatedImage: {
		width: 150,
		height: 200,
	},
	forceUpdateMsgText: {
		fontSize: 16,
		color: Color.textColor,
		fontFamily: Constants.mediumFont,
		marginTop: 8,
		letterSpacing: 0.3,
		textAlign: 'center',
	},
	forceUpdateBtnView: {
		width: '48%',
		height: 47,
		backgroundColor: Color.assetColor,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 14,
		shadowColor: Color.assetColor,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		marginTop: 20,
	},
	forceUpdateBtnText: {
		fontSize: 16,
		color: Color.white,
		fontFamily: Constants.mediumFont,
		textTransform: "uppercase",
	},

	underMainContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
		backgroundColor: 'white',
		alignItems: "center",
		justifyContent: 'center',
	},
	underMainImage: {
		width: '80%',
		height: 200,
	},
	underMainText: {
		fontSize: 20,
		color: Color.black,
		fontFamily: Constants.mediumFont,
		textAlign: 'center',
		marginTop: 10,
	},
});