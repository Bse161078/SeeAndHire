import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import Fonticon from '../../../Constants/FontIcon';
import { iconPath } from '../../../Constants/icon';
import Button from '../../../Components/Button';


const PersonProfile = () => {
    return (
        <View style={styles.container}>
            <Image source={iconPath.PERSON_IMAGE} style={{ width: "100%", height: wp(55), borderBottomLeftRadius: 35 }} />
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={[Colors.blurBlue, Colors.blurBlue, Colors.blurWhite]} style={styles.linearGradient}>
                <View style={{ top: wp(10), left: wp(5), position: "absolute", }}>
                    <Fonticon type={"Ionicons"} name={"arrow-back"} size={wp(7)} />
                </View>
                <View
                    style={{ flexDirection: "row", marginTop: wp(15) }}>
                    <View style={{ marginHorizontal: 17, flexDirection: "row", flex: 1, }}>
                        <Image source={iconPath.PERSON_IMAGE} style={{ width: wp(18), height: wp(18), borderRadius: wp(100) }} />
                        <View style={{ marginLeft: wp(3), justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.LightGray }}>{"Person Name"}</Text>
                            <Text style={{ color: Colors.LightGray }}>{"UI desingner and Coder"}</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView style={{ marginHorizontal: wp(10), marginTop: wp(5) }}>
                <Text style={{ color: Colors.BlueColor, marginTop: 10, fontWeight: "bold" }}>BIO</Text>
                <Text style={{ marginTop: 5, fontSize: 15 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</Text>
                <Text style={{ color: Colors.BlueColor, marginTop: 20, fontWeight: "bold" }}>EDUCATION</Text>
                <View style={{}}>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>B Eng Designer Engineering</Text>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Lorem Ipsum is</Text>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Lorem Ipsum is</Text>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Lorem Ipsum is</Text>
                </View>
                <Text style={{ color: Colors.BlueColor, marginTop: 20, fontWeight: "bold" }}>EXPERIENCE</Text>
                <Text style={{ marginTop: 5, textAlign: "justify" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                <Text style={{ marginTop: 5, textAlign: "justify" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                <Text style={{ marginTop: 5, textAlign: "justify" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            </ScrollView>
            <View style={{ backgroundColor: Colors.white, height: wp(20), position: "absolute", bottom: 0, width: wp(100), justifyContent: "center" }}>
                <Button title={"Contact"} marginTop={wp(13)} style={{ position: "absolute", }} />
            </View>
        </View>
    )
}
export default PersonProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    linearGradient: {
        height: wp(55),
        width: wp(100),
        // flexDirection: "row",
        justifyContent: "center",
        borderBottomLeftRadius: 35,
        position: "absolute",
        // top:0
    },
})