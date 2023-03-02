import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import UserSelection from '../../Screens/Auth/UserSelection';
import Login from '../../Screens/Auth/Login';
import Signup from '../../Screens/Auth/Signup';
import TermsAndC from '../../Screens/Auth/TermsAndC';
import FirstTimeScreen from '../../Screens/FirstTime/FirstTimeScreen';
import MapScreen from '../../Screens/Auth/MapScreen';
import { useSelector, useDispatch } from 'react-redux'

const Stack = createStackNavigator();

function AuthStack(props) {
    const firstTime = useSelector(state => state.AuthReducer.firstTime)

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {firstTime ?
                    <>
                        <Stack.Screen name="FirstTimeScreen" component={FirstTimeScreen} />
                        <Stack.Screen name="UserSelection" component={UserSelection} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="TermsAndC" component={TermsAndC} />
                        <Stack.Screen name="MapScreen" component={MapScreen} />
                    </>
                    :
                    <>
                        <Stack.Screen name="UserSelection" component={UserSelection} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="TermsAndC" component={TermsAndC} />
                        <Stack.Screen name="MapScreen" component={MapScreen} />
                    </>
                }

            </Stack.Navigator>
        </>
    );
}
export default AuthStack;