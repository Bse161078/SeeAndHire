import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Pressable, ScrollView } from 'react-native'

import { iconPath } from '../../Constants/icon';
import { wp, hp } from '../../Helpers/Responsiveness'
import { Colors } from '../../Constants/Colors';
import Button from '../../Components/Button';
import Axios from '../../Components/Axios';
import Fonticon from '../../Constants/FontIcon';
import Image_Picker from '../../Components/Image_Picker';
import { firebase } from '@react-native-firebase/messaging';
import _imageUpload from "../../Components/_imageUpload";
import { useSelector, useDispatch } from 'react-redux';
import { SetSession } from "../../Redux/Actions/Actions";

const Signup = (props) => {

    const dispatch = useDispatch();

    const [picture, setPicture] = useState("")
    const [picType, setPicType] = useState("")
    const [picBase64, setPicBase64] = useState("")
    const [pictureSelected, setpictureSelected] = useState(false)
    const [fName, setFName] = useState('')
    const [sName, setSName] = useState('')
    const [Organisation, setOrganisation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const openCamera = async (type) => {
        const res = await Image_Picker(type);
        // console.log("cameraaeResss\n", res);
        if (res === false || res === "cancel") {
            return;
        }
        setpictureSelected(true)
        setPicture(res.path)
        setPicType(res.mime)
        setPicBase64(res.data)
        // this.setState({ picture: res.path });
    };
    const signUpUser = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
        } else {
            try {
                await firebase.messaging().requestPermission();
            } catch (error) {
            }
        }
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            //   alert(JSON.stringify(fcmToken))
            signUpUserr(fcmToken)
        } else {
            console.warn('no token');
            // alert("qqq")
        }

    }
    const signUpUserr = async (fcm) => {
        if (email == '') {
            alert("Please add email")
        }
        else if (fName == '') {
            alert("Please add First Name")
        }
        else if (sName == '') {
            alert("Please add Second Name")
        }
        else if (Organisation == '') {
            alert("Please add Organisation")
        }
        else if (password == '') {
            alert("Please add password")
        }
        else {
            let Alldata = [
                  {
                    name: 'email',
                    data: email,
                  },
                  {
                    name: 'name',
                    data: fName + " " + sName,
                  },
                  {
                    name: 'company',
                    data: Organisation,
                  },
                  {
                    name: 'password',
                    data: password,
                  },
                  {
                    name: 'firebase_token',
                    data: fcm,
                  },
                  {
                    name: 'account_type',
                    data: 'Standard',
                  },
                  {
                    name: 'user_type',
                    data: props?.route?.params?.type,
                  },
                  {
                    name: 'image',
                    data: pictureSelected ? 'yes' : 'no',
                  },
                  {
                    name: 'image',
                    filename: `image${Math.floor(new Date().getTime())}.${picType.split('/')[1]}`,
                    type: picType,
                    data: picBase64,
                  },
            ]
            //  alert(JSON.stringify(Alldata))
            const res = await _imageUpload("verify_user.php", Alldata);
            if (res.includes("Registered Successfully")) {
                // alert(res?.split(":")[3]?.split(',')[0])
                let data = {}
                data["isLogin"] = true;
                data["userId"] = res?.split(":")[3]?.split(',')[0];
                data["UserRole"] = props?.route?.params?.type;
                dispatch(SetSession(data))
              } else {
                alert("User Not Registered")
              }
        }
    }

    return (
        <ScrollView>
            <ImageBackground source={iconPath.USER_SELECTION} style={Styles.bgImage}>
                <Fonticon onPress={() => props.navigation.goBack(null)} type={"Ionicons"} name={"arrow-back"} size={wp(8)} style={{ marginTop: wp(3), marginLeft: wp(3) }} />
                <View style={Styles.BoxStyle}>
                    <View style={{ paddingHorizontal: wp(10), paddingVertical: wp(8) }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign Up</Text>
                        <Text style={{ color: Colors.lightBlack, marginTop: 5, fontSize: 16 }}>Profile Photo</Text>
                        <Pressable onPress={() => openCamera("gallery")}
                            style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={pictureSelected ? { uri: picture } : iconPath.ADD_PHOTO} style={{ width: wp(17), height: wp(17), marginTop: 8, borderRadius: wp(17) / 2 }}></Image>
                            <Text style={{ color: Colors.lightBlack, marginTop: 5, fontSize: 16, marginLeft: 15 }}>Upload Photo</Text>
                        </Pressable>

                        <TextInput placeholder={"First Name"} style={{ borderBottomColor: '#000', borderBottomWidth: .7, paddingBottom: 0, fontSize: 17, marginTop: wp(3) }}
                            value={fName} onChangeText={(name) => setFName(name)} />
                        <TextInput placeholder={"Last Name"} style={{ borderBottomColor: '#000', borderBottomWidth: .7, paddingBottom: 0, fontSize: 17, marginTop: wp(3) }}
                            value={sName} onChangeText={(name) => setSName(name)} />
                        <TextInput placeholder={"Organisation"} style={{ borderBottomColor: '#000', borderBottomWidth: .7, paddingBottom: 0, fontSize: 17, marginTop: wp(3) }}
                            value={Organisation} onChangeText={(name) => setOrganisation(name)} />
                        <TextInput placeholder={"Email"} style={{ borderBottomColor: '#000', borderBottomWidth: .7, paddingBottom: 0, fontSize: 17, marginTop: wp(3) }}
                            keyboardType={"email-address"}
                            value={email} onChangeText={(name) => setEmail(name)} />
                        <TextInput placeholder={"Password"} style={{ borderBottomColor: '#000', borderBottomWidth: .7, paddingBottom: 0, fontSize: 17, marginTop: wp(3) }}
                            value={password} onChangeText={(name) => setPassword(name)}
                            secureTextEntry={true} />

                        <Button onPress={() => signUpUser()}
                            title={"SIGN UP"} marginTop={wp(10)} />

                        <Text style={{ color: '#504E4F', fontSize: 12, textAlign: "center", marginTop: 15 }}>
                            Already have an account?{' '}
                            <Text onPress={() => props.navigation.navigate("Login")} style={{ color: Colors.BlueColor }}>
                                Login{' '}
                            </Text>
                        </Text>

                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}
export default Signup;

const Styles = StyleSheet.create({
    bgImage: {
        width: wp(100),
        height: hp(100),
    },
    BoxStyle: {
        backgroundColor: Colors.white,
        flex: 1,
        marginTop: wp(25),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        // alignItems:"center"

    }
})