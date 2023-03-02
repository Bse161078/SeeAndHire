import React, { useEffect, useRef, useState } from 'react';
import {
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import RtcEngine, {
    RtcLocalView,
    RtcRemoteView,
    VideoRenderMode,
} from 'react-native-agora';

// import requestCameraAndAudioPermission from './components/Permission';
// import styles from './components/Style';

const config = {
    appId: "1213211212123",
    token: "2132123132123",
    channelName: 'channel-x',
};

const VideoScreen = (props) => {
    const _engine = useRef < RtcEngine | null > (null);
    const [isJoined, setJoined] = useState(false);
    const [peerIds, setPeerIds] = useState([]);

    useEffect(() => {
        // if (Platform.OS === 'android') {
        //     // Request required permissions from Android
        //     requestCameraAndAudioPermission().then(() => {
        //         console.log('requested!');
        //     });
        // }
    }, []);
    useEffect(() => {
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].APP_CERTIFICATE))
        // console.log(JSON.stringify(props.route?.params?.ApplicantsData[0].APP_ID))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].APP_ID))
        // console.log(JSON.stringify(props.route?.params?.ApplicantsData[0].TOKEN))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].TOKEN))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].CHANNEL_NAME))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].CHANNEL_NAME))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData))
    }, [])

    useEffect(() => {
        /**
         * @name init
         * @description Function to initialize the Rtc Engine, attach event listeners and actions
         */
      
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const init = async () => {
        const appId = props.route?.params?.ApplicantsData[0].APP_ID
        _engine.current = await RtcEngine.create(props.route?.params?.ApplicantsData[0].APP_ID);
        await _engine.current.enableVideo();

        _engine.current.addListener('Warning', (warn) => {
            console.log('Warning', warn);
        });

        _engine.current.addListener('Error', (err) => {
            console.log('Error', err);
        });

        _engine.current.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed);
            // If new user
            if (peerIds.indexOf(uid) === -1) {
                // Add peer ID to state array
                setPeerIds((prev) => [...prev, uid]);
            }
        });

        _engine.current.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason);
            // Remove peer ID from state array
            setPeerIds((prev) => prev.filter((id) => id !== uid));
        });

        // If Local user joins RTC channel
        _engine.current.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed);
                // Set state variable to true
                setJoined(true);
            }
        );
    };

    /**
     * @name startCall
     * @description Function to start the call
     */
    const startCall = async () => {
        // Join Channel using null token and channel name
        await _engine.current?.joinChannel(
            props.route?.params?.ApplicantsData[0].TOKEN,
            props.route?.params?.ApplicantsData[0].CHANNEL_NAME,
            null,
            0
        );
    };

    /**
     * @name endCall
     * @description Function to end the call
     */
    const endCall = async () => {
        await _engine.current?.leaveChannel();
        setPeerIds([]);
        setJoined(false);
    };

    const _renderVideos = () => {
        // return isJoined ? (
        //     <View style={styles.fullView}>
        //         <RtcLocalView.SurfaceView
        //             style={styles.max}
        //             channelId={props.route?.params?.ApplicantsData[0].CHANNEL_NAME}
        //             renderMode={VideoRenderMode.Hidden}
        //         />
        //         {_renderRemoteVideos()}
        //     </View>
        // ) : null;
    };

    const _renderRemoteVideos = () => {
        return (
            <ScrollView
                style={styles.remoteContainer}
                contentContainerStyle={styles.padding}
                horizontal={true}
            >
                {peerIds.map((value) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            style={styles.remote}
                            uid={value}
                            channelId={props.route?.params?.ApplicantsData[0].CHANNEL_NAME}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true}
                        />
                    );
                })}
            </ScrollView>
        );
    };

    return (
        <View style={{flex:1}}>
            {/* <View style={styles.max}>
                <View style={styles.buttonHolder}>
                    <TouchableOpacity onPress={startCall} style={styles.button}>
                        <Text style={styles.buttonText}> Start Call </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={endCall} style={styles.button}>
                        <Text style={styles.buttonText}> End Call </Text>
                    </TouchableOpacity>
                </View>
                {_renderVideos()}
            </View> */}
        </View>
    );
};

export default VideoScreen;