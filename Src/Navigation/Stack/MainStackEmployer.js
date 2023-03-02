import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../Screens/MainScreens/Employer/ChatScreen';
import JobDetails from '../../Screens/MainScreens/Employer/JobDetails';
import FullView from '../../Screens/MainScreens/Employer/FullView';
import Employer from '../BottomTab/Employer';
import PersonProfile from '../../Screens/MainScreens/Employed/PersonProfile';

const Stack = createStackNavigator();

function MainStackEmployer(props) {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Employer" component={Employer} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="JobDetails" component={JobDetails} />
                <Stack.Screen name="FullView" component={FullView} />
                <Stack.Screen name="PersonProfile" component={PersonProfile} />
            </Stack.Navigator>
        </>
    );
}
export default MainStackEmployer;