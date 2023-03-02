import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'

import { iconPath } from '../../Constants/icon';
import { wp, hp } from '../../Helpers/Responsiveness'
import { Colors } from '../../Constants/Colors';
import Button from '../../Components/Button';

const UserSelection = (props) => {
    return (
        <ImageBackground source={iconPath.USER_SELECTION} style={Styles.bgImage}>
            <Image source={iconPath.WHITE_ICON} style={Styles.logo} />
            <Text style={Styles.largeText}>What do want to do?</Text>
            <Text style={Styles.smallText}>Join the fastest growing recruitment platform today.</Text>
            <Button onPress={() => props.navigation.navigate("Login", { type: "employer" })} title={"I WANT TO EMPLOY"} borderWidth={1} />
            <Button onPress={() => props.navigation.navigate("Login", { type: "employee" })} title={"I WANT TO BE EMPLOYED"} borderWidth={1} />
        </ImageBackground>
    )
}
export default UserSelection;

const Styles = StyleSheet.create({
    bgImage: {
        width: wp(100),
        height: hp(100),
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: wp(65),
        height: wp(65),
        resizeMode: "contain"
    },
    largeText: {
        color: Colors.white,
        fontSize: 22,
        textAlign: "justify",
        marginTop: wp(3)
    },
    smallText: {
        color: Colors.white,
        fontSize: 12,
        textAlign: "center",
        width: wp(60),
        marginVertical: wp(1),
    }
})