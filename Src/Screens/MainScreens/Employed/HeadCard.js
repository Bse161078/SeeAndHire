import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { wp, hp } from '../../../Helpers/Responsiveness'
import { CHAT_HEAD } from '../../../Helpers/Moko'
import { Colors } from '../../../Constants/Colors'

export default function HeadCard(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}
                style={{ flexDirection: "row", marginTop: wp(5) }}>
                <View style={{ marginHorizontal: 10, flexDirection: "row", flex: 1, }}>
                    <Image source={props.item.Image} style={{ width: wp(15), height: wp(15), borderRadius: wp(100) }} />
                    <View style={{ marginLeft: wp(3), justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight:"bold" }}>{props.item.name}</Text>
                        <Text style={{ color: Colors.gray }}>{props.item.message}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "center" }}>
                    {props.item.unread_msgs &&
                            <Text style={{ alignSelf: 'center', color: Colors.black, fontWeight:"bold" }}>{props.item.unread_msgs}</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}
