import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { wp, hp } from '../../../Helpers/Responsiveness'
import { CHAT_HEAD } from '../../../Helpers/Moko'
import { Colors } from '../../../Constants/Colors'

export default function SearchCard(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}
                style={{ flexDirection: "row", backgroundColor: "#eee", marginTop:wp(2) }}>
                <View style={{ marginHorizontal: 17, flexDirection: "row", flex: 1, marginVertical:17}}>
                    <Image source={props.item.Image} style={{ width: wp(15), height: wp(15), borderRadius: wp(100) }} />
                    <View style={{ marginLeft: wp(3), justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight:"bold" }}>{props.item.name}</Text>
                        <Text style={{ color: Colors.gray }}>{props.item.message}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
