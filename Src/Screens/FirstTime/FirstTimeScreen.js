import React, { Component } from 'react'
import { StatusBar, SafeAreaView, ScrollView, View, Text, Dimensions, Button } from 'react-native'

import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'
const { width, height } = Dimensions.get('window')
import { SetFirstTime } from "../../Redux/Actions/Actions"
import { connect } from 'react-redux'

class FirstTimeScreen extends Component {

    onPress = (index) => {
        this.scroll.scrollTo({ x: index * width, y: 0, animated: true })
    }

    setFiestTime = () =>{
        // dispatch(SetFirstTime(false))
        this.props.SetFirstTime(false)
        // this.props.navigation.navigate("UserSelection")
    }
    render() {
        return (
            <>
                {/* <StatusBar barStyle="dark-content" /> */}
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView
                        style={{ flex: 1 }}
                        horizontal={true}
                        scrollEventThrottle={16}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        ref={(node) => this.scroll = node}
                    >
                        <View style={{ width, height }}>
                            <Screen1 onPress={() => { this.scroll.scrollTo({ x: width }) }}
                                onPressSkip={() => this.setFiestTime()} />
                        </View>
                        <View style={{ width, height }}>
                            <Screen2 onPress={() => { this.scroll.scrollTo({ x: width * 2 }) }}
                                onPressSkip={() => this.setFiestTime()} />
                        </View>
                        <View style={{ width, height }}>
                            <Screen3 onPress={() => this.setFiestTime()} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetFirstTime: (data) => dispatch(SetFirstTime(data)),
    }
}
export default connect(null, mapDispatchToProps)(FirstTimeScreen);
