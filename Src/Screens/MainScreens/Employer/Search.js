import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'

import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { CHAT_HEAD } from '../../../Helpers/Moko';
import { useSelector } from 'react-redux';

import Axios from '../../../Components/Axios';
import Header_ from '../../../Components/Header';

const Search = (props) => {
    return (
        <View style={styles.container}>
            <Header_ title="Search" />
            <View style={{ flex: 1, marginHorizontal: wp(5) }}>
                <FlatList
                    data={CHAT_HEAD}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.BoxStyle} onPress={() => props.navigation.navigate("JobDetails")}>
                            <Image source={iconPath.PERSON_IMAGE} style={{ width: "100%", height: wp(45), borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
                            <View style={{ marginHorizontal: wp(4), marginVertical: wp(4) }}>
                                <Text style={{}}>UI Application Designer</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                                    <Text>London, GB</Text>
                                    <Text style={{ backgroundColor: "#ccc", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15 }}>0.2km</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )} />
            </View>
        </View>
    )
}
export default Search;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    BoxStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: "#fff",
        marginTop: wp(5),
        borderBottomColor: "blue",
        borderBottomWidth: 2
    }
})

