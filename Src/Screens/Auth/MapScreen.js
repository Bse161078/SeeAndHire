import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import MapView, { Marker } from "react-native-maps";
import Header from '../../Components/Header';
import { wp } from '../../Helpers/Responsiveness';
import Button from '../../Components/Button';

const MapScreen = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })
    const [markerLat, setMarkerLat] = useState(37.78825)
    const [markerLng, setMarkerLng] = useState(-122.4324)
    return (
        <View style={styles.container}>
            <Header title={"Where is your business?"} />
            <MapView
                style={{ flex: 1 }}
                // showsUserLocation={true}
                region={region}
            // onPress={(e) => this.markerLAtLng(e.nativeEvent.coordinate)}
            >
                <Marker coordinate={{ latitude: markerLat, longitude: markerLng }} />
            </MapView>
            <View style={{ backgroundColor: "#fff", height: wp(30), position: "absolute", bottom: 0, width:wp(100), borderRadius:30, justifyContent:"center" }}>
                <Button title="Save"/>
            </View>
        </View>
    )
}
export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
