import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { wp, hp } from '../../../Helpers/Responsiveness'
import { CHAT_HEAD } from '../../../Helpers/Moko'
import { Colors } from '../../../Constants/Colors'

export default function CategoryCard(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}
                style={{ flexDirection: "row", backgroundColor: "#eee", marginTop:wp(2) }}>
                <View style={{ marginHorizontal: 15, flexDirection: "row", flex: 1, marginVertical:12}}>
                    <View style={{ marginLeft: wp(3), justifyContent: "center" }}>
                        <Text style={{ fontSize: 15,  }}>{props.item?.NAME}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
