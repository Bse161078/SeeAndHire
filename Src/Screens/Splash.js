import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import { wp } from '../Helpers/Responsiveness';
import { Colors } from '../Constants/Colors';
import { iconPath } from '../Constants/icon';

export default class Splash extends Component {
    render() {
        return (
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={[Colors.BlueColor, Colors.BlueColor, '#A6ABF9']} style={styles.linearGradient}>
                <Image source={iconPath.WHITE_ICON} style={{width:wp(60), height:wp(60), resizeMode:"contain"}}/>
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
});
