import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

import Axios from '../../../Components/Axios';
import Header_ from '../../../Components/Header';
import HeadCard from './HeadCard';
import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import { CHAT_HEAD } from '../../../Helpers/Moko';
import { useSelector } from 'react-redux';

export default function ChatHead(props) {

    const userId = useSelector(state => state.AuthReducer.userId);
    const [chatHeads, setChatHeads] = useState([])

    useEffect(() => {
        readChatHeads()
    }, [])

    const readChatHeads = async () => {
        let data = {}
        data["id"] = userId;
        const res = await Axios("read_chat_head.php", data);
        // alert(JSON.stringify(res.message[0].JOBCATEGORY))
        setChatHeads(res.message)
    }

    const chatHeadPress = (item) => {
        props.navigation.navigate("ChatScreen", { item })
        // alert(JSON.stringify(item))
    }

    return (
        <View style={styles.container}>
            <Header_ title="Chat" />
            <View style={{ marginHorizontal: wp(4), flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={chatHeads}
                    showsVerticalScrollIndicator={false}
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
