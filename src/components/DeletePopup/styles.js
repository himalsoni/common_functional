import { StyleSheet } from 'react-native';
import { Constants, Color, Styles } from '@common';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    innerContainer: {
        width: Styles.width * 0.9,
        height: Styles.height * 0.25,
        backgroundColor: "white",
        borderRadius: 15,
        paddingVertical: 30,
    },
    titleText: {
        color: Color.titleText,
        fontSize: 17,
        fontFamily: Constants.boldFont,
        textAlign: 'center',
    },
    descText: {
        color: Color.textColor,
        fontSize: 15,
        fontFamily: Constants.bookFont,
        textAlign: 'center',
        marginTop: 15,
    },

    btnContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 30,
        marginBottom: 30,
        flexDirection: 'row',
    },
    okBtn: {
        backgroundColor: Color.assetColor,
        height: 45,
        width: 120,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    okBtnText: {
        fontSize: 16,
        color: Color.white,
        fontFamily: Constants.mediumFont,
        textAlign: 'center',
    },
    cancelBtn: {
        height: 45,
        width: 120,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.assetColor,
        borderWidth: 1,
    },
    cancelBtnText: {
        fontSize: 16,
        color: Color.assetColor,
        fontFamily: Constants.mediumFont,
        textAlign: 'center',
    },

    inputWrap: {
        height: 47,
        backgroundColor: '#F2F1F6',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "transparent",
        marginTop: 15,
        marginHorizontal: 20,
    },
    inputWrapError: {
        height: 47,
        backgroundColor: '#F2F1F6',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#E2401B",
        marginTop: 15,
        marginHorizontal: 20,
    },
    authInput: {
        flex: 1,
        color: Color.mainColor,
        fontSize: 14,
        opacity: 0.9,
        paddingHorizontal: 15,
        letterSpacing: 0.5,
        fontFamily: Constants.mediumFont,
    },
});
