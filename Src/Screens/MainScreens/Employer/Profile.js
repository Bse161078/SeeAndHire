import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'

import Axios from '../../../Components/Axios';
import Header_ from '../../../Components/Header';
import Button from '../../../Components/Button';
import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import { SetSession } from "../../../Redux/Actions/Actions";
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.AuthReducer.userId);

    const [name, setName] = useState("")
    const [Organization, setOrganization] = useState("")

    useEffect(() => {
        readProfile()
    }, [])

    const readProfile = async () => {
        let data = {}
        data["user_id"] = userId;
        const res = await Axios("read_profile.php", data);
        // alert(JSON.stringify(res.organization))
        setName(res?.name)
        setOrganization(res?.organization)
    }

    const logOutUser = () => {
        let data = {}
        data["isLogin"] = false;
        data["userId"] = '';
        data["UserRole"] = '';
        dispatch(SetSession(data))
    }

    return (
        <View style={{ flex: 1 }}>
            <Header_ />
            <View style={{ marginHorizontal: wp(10), marginTop: wp(5), flex: 1 }}>
                {/* <Text style={{ color: Colors.BlueColor, marginTop: 10, fontWeight: "bold" }}>LOCATION</Text>
                <Text style={{ marginTop: 5 }}>London, GB</Text> */}
                <Text style={{ color: Colors.BlueColor, marginTop: 10, fontWeight: "bold" }}>NAME</Text>
                <Text style={{ marginTop: 5 }}>{name}</Text>
                <Text style={{ color: Colors.BlueColor, marginTop: 15, fontWeight: "bold" }}>ORGANISATION</Text>
                <Text style={{ marginTop: 5 }}>{Organization}</Text>
                <Button onPress={() => logOutUser()}
                    title={"Sign out"} marginTop={wp(13)} style={{ position: "absolute", bottom: wp(10) }} />
            </View>
        </View>
    )
}
export default Profile;
