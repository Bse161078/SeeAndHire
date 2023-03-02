import React from 'react'
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import { wp, hp } from '../../../Helpers/Responsiveness'
import { CHAT_HEAD } from '../../../Helpers/Moko'
import { Colors } from '../../../Constants/Colors'
import { iconPath } from '../../../Constants/icon'
import { BaseUrl1 } from '../../../Constants/BaseUrl'

export default function ApplicantCard(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}
                style={{ flexDirection: "row", marginTop: wp(5) }}>
                <View style={{ marginHorizontal: 10, flexDirection: "row", flex: 1, }}>
                    <Image source={props.item?.IMAGE_URL == null ? iconPath.PERSON_IMAGE : { uri: BaseUrl1 + props.item?.IMAGE_URL }} style={{ width: wp(15), height: wp(15), borderRadius: wp(100) }} />
                    <View style={{ marginLeft: wp(3), justifyContent: "center" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{props.item?.EMPLOYEE_NAME}</Text>
                        <Pressable onPress={props.msgPress} style={{ backgroundColor: Colors.BlueColor, padding:wp(1.5), borderRadius:5, marginTop:5, alignSelf:"flex-start" }}>
                            <Text style={{ color: Colors.white }}>{"Send Message"}</Text>
                        </Pressable>
                        <Text style={{color:"#000"}}>{`${props.item?.INTERVIEW_TIME}${" - "}${props.item?.INTERVIEW_DATE}${" ("}${props.item?.INTERVIEW_STATUS}${")"} `}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}
