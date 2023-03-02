import React from 'react'
import { View, Text, Image } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { iconPath } from '../../Constants/icon';
import { wp } from '../../Helpers/Responsiveness';

import MyJobsStack from '../Stack/MyJobsStack'
import SearchStack from '../Stack/SearchStack'
import ChatHead from '../../Screens/MainScreens/Employer/ChatHead';
import MyJobs from '../../Screens/MainScreens/Employer/MyJobs';
import Profile from '../../Screens/MainScreens/Employer/Profile';
import Search from '../../Screens/MainScreens/Employer/Search';
import Search1 from '../../Screens/MainScreens/Employed/Search';
import SelectCategory from '../../Screens/MainScreens/Employed/SelectCategory';

const Tab = createBottomTabNavigator();



export default function Employer() {
    return (
        <Tab.Navigator tabBarOptions={{ showIcon: true,  }}>
            <Tab.Screen name="My Jobs" component={MyJobsStack}
                options={{ tabBarIcon: ({ focused }) => (<Image source={iconPath.BOTTOM1} style={{ width: wp(8), height: wp(8) }} resizeMode={'contain'} />) }} />
            <Tab.Screen name="Chat" component={ChatHead}
                options={{ tabBarIcon: ({ focused }) => (<Image source={iconPath.BOTTOM2} style={{ width: wp(6), height: wp(6) }} resizeMode={'contain'} />) }} />
            <Tab.Screen name="Search" component={SearchStack}
                options={{ tabBarIcon: ({ focused }) => (<Image source={iconPath.BOTTOM3} style={{ width: wp(6), height: wp(6) }} resizeMode={'contain'} />) }} />
            <Tab.Screen name="Profile" component={Profile}
                options={{ tabBarIcon: ({ focused }) => (<Image source={iconPath.BOTTOM4} style={{ width: wp(6), height: wp(6) }} resizeMode={'contain'} />) }} />
        </Tab.Navigator>
    );
}