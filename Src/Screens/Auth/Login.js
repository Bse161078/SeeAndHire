import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, TextInput } from 'react-native'

import Button from '../../Components/Button';
import Fonticon from '../../Constants/FontIcon';
import GoogleSign from '../../Components/GoogleSign';
import FacebookLogin from '../../Components/FacebookLogin';
import _imageUpload from "../../Components/_imageUpload";
import { wp, hp } from '../../Helpers/Responsiveness'
import { Colors } from '../../Constants/Colors';
import { iconPath } from '../../Constants/icon';
import { firebase } from '@react-native-firebase/messaging';
import { SetSession } from "../../Redux/Actions/Actions";
import { useDispatch } from 'react-redux';

const Login = (props) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const googleLogin = async () => {
        let info = await GoogleSign()
        if (info.Error == undefined) {
            getFcmFun(info)
        } else {
            console.log(JSON.stringify(info.Error));
        }
    }
    const facebookLogin = async () => {
        let info = await FacebookLogin();
        if (info.Error === undefined) {
            // alert(JSON.stringify(info.Data))
            getFcmFunFB(info.Data)
        } else {
            console.warn(JSON.stringify(info.Error));
        }
    }
    const getFcmFunFB = async (info) => {
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
            SocialFBLogin(info, fcmToken)
        } else {
            console.warn('no token');
        }
    }
    const SocialFBLogin = async (info, fcm) => {
        let Alldata = [
            {
                name: 'email',
                data: info?.userInfo?.email,
            },
            {
                name: 'name',
                data: info.userInfo?.name,
            },
            {
                name: 'company',
                data: " ",
            },
            {
                name: 'password',
                data: " ",
            },
            {
                name: 'firebase_token',
                data: fcm,
            },
            {
                name: 'account_type',
                data: 'Facebook',
            },
            {
                name: 'user_type',
                data: props?.route?.params?.type,
            },
            {
                name: 'image',
                data: info?.userInfo?.picture?.data?.url,
            },
        ]
        const res = await _imageUpload("verify_user.php", Alldata);
        if (res.includes("Login Successfully")) {
            let data = {}
            data["isLogin"] = true;
            data["userId"] = res?.split(":")[3]?.split('"')[1];
            data["UserRole"] = props?.route?.params?.type;
            dispatch(SetSession(data))
        }
        else if (res.includes("Registered Successfully!")) {
            let data = {}
            data["isLogin"] = true;
            data["userId"] = res?.split(":")[3]?.split(',')[0];
            data["UserRole"] = props?.route?.params?.type;
            dispatch(SetSession(data))
        }
        else {
            // alert("User Not Registered" + JSON.stringify(res))
        }

    }
    const getFcmFun = async (info) => {
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
            SocialGoogleLogin(info, fcmToken)
        } else {
            console.warn('no token');
        }
    }
    const SocialGoogleLogin = async (info, fcm) => {
        let Alldata = [
            {
                name: 'email',
                data: info.Data?.userInfo?.user?.email,
            },
            {
                name: 'name',
                data: info.Data?.userInfo?.user?.name,
            },
            {
                name: 'company',
                data: " ",
            },
            {
                name: 'password',
                data: " ",
            },
            {
                name: 'firebase_token',
                data: fcm,
            },
            {
                name: 'account_type',
                data: 'Google',
            },
            {
                name: 'user_type',
                data: props?.route?.params?.type,
            },
            {
                name: 'image',
                data: info.Data.userInfo.user.photo,
            },
        ]
        const res = await _imageUpload("verify_user.php", Alldata);
        if (res.includes("Login Successfully")) {
            let data = {}
            data["isLogin"] = true;
            data["userId"] = res?.split(":")[3]?.split('"')[1];
            data["UserRole"] = props?.route?.params?.type;
            dispatch(SetSession(data))
        }
        else if (res.includes("Registered Successfully!")) {
            let data = {}
            data["isLogin"] = true;
            data["userId"] = res?.split(":")[3]?.split(',')[0];
            data["UserRole"] = props?.route?.params?.type;
            dispatch(SetSession(data))
        }
        else {
            // alert("User Not Registered" + JSON.stringify(res))
        }

    }
    const LoginUserFun = async () => {
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
            loginUser(fcmToken)
        } else {
            console.warn('no token');
        }

    }
    const loginUser = async (fcm) => {
        if (email === '') {
            alert("Please add email")
        }
        else if (password === '') {
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
                    data: "",
                },
                {
                    name: 'company',
                    data: "",
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
                    data: 'no',
                },
            ]
            const res = await _imageUpload("verify_user.php", Alldata);
            if (res.includes("Login Successfully")) {
                // alert(res?.split(":")[3]?.split('"')[1])
                let data = {}
                data["isLogin"] = true;
                data["userId"] = res?.split(":")[3]?.split('"')[1];
                data["UserRole"] = props?.route?.params?.type;
                dispatch(SetSession(data))
            } else {
                alert("User Not Registered")
                // alert("User Not Registered" + JSON.stringify(res))
            }
        }
    }
    return (
        <ImageBackground source={iconPath.USER_SELECTION} style={Styles.bgImage}>
            <Fonticon onPress={() => props.navigation.goBack(null)} type={"Ionicons"} name={"arrow-back"} size={wp(8)} style={{ marginTop: wp(3), marginLeft: wp(3) }} />
            <View style={Styles.BoxStyle}>
                <View style={{ paddingHorizontal: wp(10), paddingVertical: wp(8) }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login</Text>
                    <TextInput placeholder={"Email"} style={{ borderBottomColor: '#000', borderBottomWidth: .7, paddingBottom: 0, fontSize: 17, }}
                        keyboardType={"email-address"}
                        value={email} onChangeText={(name) => setEmail(name)} />
                    <TextInput placeholder={"Password"} style={{ borderBottomColor: '#000', borderBottomWidth: .7, paddingBottom: 0, fontSize: 17, marginTop: wp(5) }}
                        value={password} onChangeText={(name) => setPassword(name)}
                        secureTextEntry={true} />
                    <Button title={"LOGIN"} marginTop={wp(13)}
                        onPress={() => LoginUserFun()} />
                    <Text onPress={() => props.navigation.navigate("Signup", {type: props?.route?.params?.type})}
                        style={Styles.continue}>Continue with Signup</Text>
                </View>
                <View style={[Styles.BoxStyle, { backgroundColor: Colors.LightGray, marginTop: 0, paddingHorizontal: wp(10), paddingVertical: wp(2) }]}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login with</Text>
                    <Button title={"FACEBOOK"} marginTop={wp(5)} icon type={"Entypo"} name={"facebook"} backgroundColor={"#2C4384"}
                        onPress={() => facebookLogin()} />
                    <Button title={"LINKEDIN"} marginTop={wp(1)} icon type={"AntDesign"} name={"linkedin-square"} backgroundColor={"#2166A5"} />
                    <Button title={"GOOGLE"} marginTop={wp(1)} icon type={"AntDesign"} name={"google"} backgroundColor={"#E32C2A"}
                        onPress={() => googleLogin()} />

                    <View style={{ marginTop: 5 }}>
                        <Text style={{ color: '#504E4F', fontSize: 12, textAlign: "center" }}>
                            By using this app you agree with our{' '}
                            <Text onPress={() => props.navigation.navigate("TermsAndC")}
                                style={{ color: Colors.BlueColor }}>
                                Terms and Conditions{' '}
                            </Text>
                            and our
                            <Text onPress={() => props.navigation.navigate("TermsAndC")}
                                style={{ color: Colors.BlueColor }}>
                                {' '}Privacy Policy
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}
export default Login;

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
    },
    continue: {
        color: Colors.BlueColor,
        alignSelf: "center",
        marginTop: 8
    }
})