import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'
import Header_ from '../../../Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { wp } from '../../../Helpers/Responsiveness'
import { Colors } from '../../../Constants/Colors'

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Image: '',
            Name: '',
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
        var item = this.props.route.params.item
        this.setState({ Image: item.Image, Name: item.name })
    }

    onSend = (messages = []) => {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
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
        const { Image, Name, messages } = this.state;
        return (
            <View style={styles.container}>
                <Header_  title={Name} right type={"Ionicons"} name={"arrow-back"}/>
                <GiftedChat
                    messages={messages}
                    placeholder={"Your message here..."}
                    renderSend={this.renderSend}

                    renderBubble={this.renderBubble}
                    // renderAvatar={null}
                    alwaysShowSend={true}
                    // messages={this.state.messages.length > 0 ? this.state.messages : []}
                    onSend={messages => this.onSend(messages)}
                    user={{ _id: 1 }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderRadius: 35,
        backgroundColor: "white",
        // padding: 2,
        borderColor: "#1C61B1",
        borderWidth: 1,
        borderTopWidth: 1,
        borderTopColor: "#1C61B1",
        marginHorizontal: 1

    }
})
