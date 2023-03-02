import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { wp } from '../../Helpers/Responsiveness';
import { WebView } from 'react-native-webview';

export default function TermsAndC(props) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: Colors.BlueColor, height: wp(18), flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
                <Text style={Styles.textStyle}>{"T&C and Privacy Policy"}</Text>
                <Text onPress={() => props.navigation.goBack(null)}
                    style={Styles.textStyle}>{"Done"}</Text>
            </View>
            <View style={{ flex: 1, }}>
                <WebView source={{ uri: 'https://practical-curran-22a68b.netlify.app/' }} style={{ flex: 1, minHeight: 200, height: 300, }}
                    androidHardwareAccelerationDisabled={true} androidLayerType="software" 
                     scalesPageToFit={false}/>
            </View>
        </View>
    )
}
const Styles = StyleSheet.create({
    textStyle: {
        color: Colors.white, fontSize: 18
    }
})
