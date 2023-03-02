import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'

import Video from 'react-native-video';

export default function FullView(props) {

    const [loading, setLoading] = useState(false);

    const onLoadStart = () => {
        setLoading(true)
    }
    const onLoad = () => {
        setLoading(false)
    }
    function onEnd() {
        // alert("end")
        // onPlayPausePress()
    }

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Pressable>
                <Video
                    source={{ uri: props.route.params?.mediaLink }}
                    // source={{ uri: "https://d2m3pglccrnab5.cloudfront.net/apvideo.mp4" }}
                    style={{ width: "100%", height: "100%" }}
                    onError={(e) => console.log(e)}
                    // posterResizeMode="stretch"
                    resizeMode="contain"
                    repeat={false}
                    onEnd={onEnd}
                    onLoad={() => onLoad()}
                    onLoadStart={() => onLoadStart()}
                    hideShutterView={true}
                    controls={true}
                    // volume={0}
                // paused={paused}
                // paused={playing}
                // paused={props?.PausedVideo}
                // paused={true}
                />
            </Pressable>

            <ActivityIndicator size="large" color="#ffffff"
                style={{ position: "absolute", alignSelf: "center", top: "45%" }}
                animating={loading}
            />
        </View>
    )
}