import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

import Header_ from '../../../Components/Header';
import { wp } from '../../../Helpers/Responsiveness';
import { CHAT_HEAD } from '../../../Helpers/Moko';
import { Colors } from '../../../Constants/Colors';
import HeadCard from './HeadCard';

export default function ChatHead(props) {
    const chatHeadPress = (item) => {
        props.navigation.navigate("ChatScreen",{item})
        // alert(JSON.stringify(item))
    }

    return (
        <View style={styles.container}>
            <Header_ title="Chat" />
            <View style={{ marginHorizontal: wp(4), flex:1 }}>
                <FlatList
                style={{flex:1}}
                    data={CHAT_HEAD}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <HeadCard item={item} onPress={() => chatHeadPress(item)} />
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
