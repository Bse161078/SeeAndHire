import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

import Header_ from '../../../Components/Header';
import { wp } from '../../../Helpers/Responsiveness';
import { CHAT_HEAD } from '../../../Helpers/Moko';
import { Colors } from '../../../Constants/Colors';
import SearchCard from './SearchCard';

export default function Search(props) {


    return (
        <View style={styles.container}>
            <Header_ title="Search" />
            <View style={{ marginHorizontal: wp(4), flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={CHAT_HEAD}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <SearchCard item={item}  />
                    )} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
})
