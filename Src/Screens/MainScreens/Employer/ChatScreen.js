import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Pressable } from 'react-native'

import Axios from '../../../Components/Axios'
import moment from 'moment'
import Header_ from '../../../Components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import _imageUpload from "../../../Components/_imageUpload"
import Image_Picker from '../../../Components/Image_Picker'
import { wp } from '../../../Helpers/Responsiveness'
import { Colors } from '../../../Constants/Colors'
import { connect } from "react-redux"
import { useSelector } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler'
// import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'

class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Image: '',
            Name: '',
            jobId: '',
            receiverId: '',
            picBase64: '',
            picType: '',
            chatMsgs: [],
            newMessage: "",
            messages: [{
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }],
        };
    }

    componentDidMount() {
        this.setValue()
        this.readChat()
        // this.onSend()
    }

    setValue = () => {
        // alert(JSON.stringify(this.props.userId))
        var item = this.props.route?.params?.item
        // alert(JSON.stringify(item.NAME))
        // this.setState({ Name: item?.EMPLOYEE_NAME })
        this.setState({ Name: item?.NAME })
        this.setState({ jobId: item.JOB_ID, receiverId: item.RECEIVER_ID })
    }
    readChat = async () => {
        var item = this.props.route?.params?.item
        let data = {}
        data["id"] = this.props.userId;
        data["receiver_id"] = item.RECEIVER_ID;
        data["job_id"] = item.JOB_ID;
        const res = await Axios("read_chat.php", data);
        this.setState({ chatMsgs: res.message })
        // alert(JSON.stringify(res.message[0].user.name))
        // setChatMsgs(res.message)
    }
    openCamera = async (type) => {
        const res = await Image_Picker(type);
        // console.log("cameraaeResss\n", res);
        if (res === false || res === "cancel") {
            return;
        }
        // this.setState({picBase64: res.data, picType: res.mime})
        this.onSendImg(res.data, res.mime)
        // setpictureSelected(true)
        // setPicture(res.path)
        // setPicType(res.mime)
        // setPicBase64(res.data)
        // this.setState({ picture: res.path });
    }
    onSendImg = async (picData, picType) => {
        let Alldata = [
            {
                name: 'job_id',
                data: this.state.jobId,
            },
            {
                name: 'sender_id',
                data: this.props.userId,
            },
            {
                name: 'receiver_id',
                data: this.state.receiverId,
            },
            {
                name: 'content',
                data: picData,
            },
            {
                name: 'content_type',
                data: "photo",
            },
        ]

        const res = await _imageUpload("add_chat.php", Alldata);
        alert(JSON.stringify(res))
        // this.readChat()
    }
    onSend = async () => {
        if (this.state.newMessage.trim() != "") {
            let Alldata = [
                {
                    name: 'job_id',
                    data: this.props.route?.params?.item?.JOB_ID,
                },
                {
                    name: 'sender_id',
                    data: this.props.userId,
                },
                {
                    name: 'receiver_id',
                    data: this.props.route?.params?.item?.RECEIVER_ID,
                },
                {
                    name: 'content',
                    data: this.state.newMessage,
                },
                {
                    name: 'content_type',
                    data: "message",
                },
            ]

            const res = await _imageUpload("add_chat.php", Alldata);
            this.setState({ newMessage: "" })
            this.readChat()
        }
    }
    renderBubble(props) {
        return (<Bubble {...props}
            textStyle={{
                right: {
                    color: 'white',
                },
                left: {
                    color: 'black',
                },
            }}
            wrapperStyle={{
                left: {
                    backgroundColor: '#ccc',
                },
                right: {
                    backgroundColor: Colors.BlueColor,
                },
            }}
        />)
    }
    renderSend = (props) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: "center", opacity: 0.7, flexDirection: "row", }}>
                <View style={{ backgroundColor: "#1C61B1", width: 2, marginRight: 5, height: wp(10) }}></View>
                {/* <Ionicons name="image" size={28} color={'#1C61B1'} style={{ marginRight: 5 }}
                    onPress={() => this.openCamera("gallery")} /> */}
                <Send
                    {...props}>
                    <View style={{ padding: 5, borderColor: "transparent", marginRight: 5, }}>
                        <Ionicons name="send-outline" size={30} color={'#1C61B1'} />
                    </View>
                </Send>
            </View>
        );
    }

    render() {
        const { Name, messages } = this.state;
        return (
            <View style={styles.container}>
                <Header_ title={Name} right Emptyleft type={"Ionicons"} name={"arrow-back"}
                    onRightPress={() => this.props.navigation.goBack()} />

                <FlatList
                    inverted
                    data={this.state.chatMsgs}
                    extraData={this.state.chatMsgs}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ paddingBottom: wp(9) }}
                    contentContainerStyle={{ paddingHorizontal: wp(2), paddingVertical: wp(3), justifyContent: "space-between", }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <>
                            {item?.user?._id == this.props.userId ?
                                <View style={{ flexDirection: "row" }}>
                                    {item.user.avatar == "" ?
                                    <View style={{ width: wp(12), height: wp(12), borderRadius: wp(6), backgroundColor:Colors.Facebook, alignItems:"center", justifyContent:"center" }}>
                                        <Text style={{color:"#fff", fontSize:18, fontWeight:"bold"}}>{item.user.name[0]}</Text>
                                    </View>
                                    :
                                    <Image source={{ uri: item.user.avatar }} style={{ width: wp(12), height: wp(12), borderRadius: wp(6), borderWidth: 1, borderColor: "#000" }} />}
                                    <View style={styles.ownMsgContainer}>
                                        <Text style={{ color: "#00000080", textAlign: "right", marginTop: -9, fontSize: 12 }}>{moment(item?.createdAt).format('hh:mm A')}</Text>
                                        <Text style={{ color: "#000000" }}>{item?.text}</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.otherMsgContainer}>
                                    <Text style={{ color: "#FFFFFFB2", textAlign: "left", marginTop: -9, fontSize: 12 }}>{moment(item?.createdAt).format('hh:mm A')}</Text>
                                    <Text style={{ color: "#fff", textAlign: "left" }}>{item?.text}</Text>
                                </View>
                            }
                        </>
                    )} />

                <View style={{ paddingHorizontal: wp(3), flexDirection: "row", paddingVertical: 5, alignItems: "center" }}>
                    <View style={styles.msgContainer}>
                        <TextInput style={{ borderRadius: 35, paddingLeft: wp(5), flex: 1, color: "#000" }}
                            placeholder={"Send a message"}
                            placeholderTextColor={"#0000004D"}
                            value={this.state.newMessage}
                            onChangeText={(txt) => this.setState({ newMessage: txt })}
                        />

                        <Pressable onPress={() => this.onSend()}
                            style={[styles.boxWithShadow, {
                                backgroundColor: "#fff", borderRadius: 100,
                                alignItems: "center", justifyContent: "center", height: "100%", marginRight: -1,
                                width: wp(12)
                            }]}>
                            <Ionicons name="send-outline" size={28} color={'#1C61B1'} />
                        </Pressable>
                    </View>
                </View>


                {/* <GiftedChat
                    messages={this.state.chatMsgs}
                    placeholder={"Your message here..."}
                    renderSend={this.renderSend}
                    renderBubble={this.renderBubble}
                    // renderAvatar={null}
                    alwaysShowSend={true}
                    // messages={this.state.messages.length > 0 ? this.state.messages : []}
                    onSend={messages => this.onSend(messages)}
                    user={{ _id: this.props.userId ? this.props.userId : "1" }}
                 /> */}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.AuthReducer.userId,
    }
}
export default connect(mapStateToProps, null)(ChatScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderRadius: 35,
        backgroundColor: "white",
        borderColor: "#1C61B1",
        borderWidth: 1,
        borderTopWidth: 1,
        borderTopColor: "#1C61B1",
        marginHorizontal: 1
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    msgContainer: {
        flex: 1, borderColor: "#00000040", borderWidth: 1, borderRadius: 5, height: 52,
        flexDirection: "row", marginLeft: wp(2), borderRadius: 35
    },
    otherMsgContainer: {
        backgroundColor: Colors.BlueColor, marginBottom: wp(3.5), marginRight: wp(2), width: wp(65), padding: wp(3),
        borderTopLeftRadius: 0, borderTopRightRadius: 20, borderBottomLeftRadius: 20,
        alignSelf: "flex-end", minHeight: wp(14)
    },
    ownMsgContainer: {
        backgroundColor: "#FFFFFF", marginBottom: wp(3), marginLeft: wp(2), width: wp(65), padding: wp(3), minHeight: wp(14),
        borderTopLeftRadius: 20, borderTopRightRadius: 0, borderBottomRightRadius: 20, borderColor: "#00000040", borderWidth: 1
    },
})
