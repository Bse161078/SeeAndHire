import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyJobs from '../../Screens/MainScreens/Employer/MyJobs';
import AppliedJobs from '../../Screens/MainScreens/Employer/AppliedJobs';
import AppliedJobsDetails from '../../Screens/MainScreens/Employer/AppliedJobsDetails';
import PostJob from '../../Screens/MainScreens/Employer/PostJob';
import Applicants from '../../Screens/MainScreens/Employer/Applicants';
import VideoScreen from '../../Screens/MainScreens/Employer/VideoScreen';
import VideoCall from '../../Screens/MainScreens/Employer/VideoCall';

const Stack = createStackNavigator();

function MyJobsStack(props) {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MyJobs" component={MyJobs} />
                <Stack.Screen name="PostJob" component={PostJob} />
                <Stack.Screen name="VideoCall" component={VideoCall} />
                <Stack.Screen name="Applicants" component={Applicants} />
                <Stack.Screen name="AppliedJobs" component={AppliedJobs} />
                <Stack.Screen name="VideoScreen" component={VideoScreen} />
                <Stack.Screen name="AppliedJobsDetails" component={AppliedJobsDetails} />
            </Stack.Navigator>
        </>
    );
}
export default MyJobsStack;