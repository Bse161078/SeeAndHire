import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SelectCategory from '../../Screens/MainScreens/Employed/SelectCategory';
import CategoryJobs from '../../Screens/MainScreens/Employer/CategoryJobs';

const Stack = createStackNavigator();

function SearchStack(props) {
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SelectCategory" component={SelectCategory} />
                <Stack.Screen name="CategoryJobs" component={CategoryJobs} />
            </Stack.Navigator>
        </>
    );
}
export default SearchStack;