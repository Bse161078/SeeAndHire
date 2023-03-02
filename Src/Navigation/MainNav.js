import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'

import Splash from '../Screens/Splash'
import AuthStack from './Stack/AuthStack';
// import Employer from './BottomTab/Employer';
import MainStackEmployer from './Stack/MainStackEmployer';
// import LinkedIn from '../Screens/Auth/LinkedIn';
// import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'

const Stack = createStackNavigator();

function MainNav(props) {

    const isLogin = useSelector(state => state.AuthReducer.isLogin)

    useEffect(() => { setTimeout(() => { setTimePassed(true) }, 2000) })
    const [timePassed, setTimePassed] = useState(false)
    
    return (
        <>
            <StatusBar backgroundColor={'#252BF8'} />
            {!timePassed ?
                <Splash />
                :
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {isLogin ?
                            <Stack.Screen name="MainStackEmployer" component={MainStackEmployer} />
                            :
                            <Stack.Screen name="AuthStack" component={AuthStack} />
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </>
    );
}
export default MainNav;