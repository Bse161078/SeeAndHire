import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'

import { iconPath } from '../../Constants/icon';
import { wp, hp } from '../../Helpers/Responsiveness';
import { Colors } from '../../Constants/Colors';
import Button from '../../Components/Button';

const Screen3 = (props) => {
    return (
        <ImageBackground source={iconPath.FIRST_TIME3} style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.heading}>Instant Contact</Text>
                <Text style={styles.description}>Chat Live, Call, Text or E-mail</Text>
                <Image source={iconPath.SLIDER3} style={styles.Slider} />
                <Button title="CONTINUE" onPress={props.onPress} />
                <Text style={styles.Skip}></Text>
            </View>
        </ImageBackground >
    )
}
export default Screen3;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    innerContainer: {
        backgroundColor: Colors.white,
        alignItems: "center",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    heading: {
        marginTop: wp(20),
        fontWeight: "bold",
        fontSize: 20
    },
    description: {
        textAlign: "center",
        width: wp(95),
        marginTop: wp(5)
    },
    Slider: {
        width: wp(15),
        height: wp(15),
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: wp(5)
    },
    Skip: {
        color: Colors.BlueColor,
        marginBottom: wp(10),
        marginTop: wp(3)
    }
})
