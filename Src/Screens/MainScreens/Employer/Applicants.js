import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Image, FlatList,
    Modal
} from 'react-native';

import { wp } from '../../../Helpers/Responsiveness'
import { Colors } from '../../../Constants/Colors'
import { useSelector } from 'react-redux'

import Axios from '../../../Components/Axios'
import moment from "moment"
import Button from '../../../Components/Button'
import Header_ from '../../../Components/Header'
import DatePicker from 'react-native-date-picker'
import ApplicantCard from './ApplicantCard'

export default function Applicants(props) {

    const userId = useSelector(state => state.AuthReducer.userId);

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [creditModal, setCreditModal] = useState(false)
    const [selectedApplicant, setSelectedApplicant] = useState("")

    const chatHeadPress = (item) => {
        setSelectedApplicant(item)
        setCreditModal(true)
        // props.navigation.navigate("VideoScreen", { ApplicantsData: props.route?.params?.ApplicantsData })
        // alert(JSON.stringify(item))
    }

    useEffect(() => {
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].INTERVIEW_DATE))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].INTERVIEW_TIME))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].INTERVIEW_STATUS))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].APP_ID))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].TOKEN))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData[0].CHANNEL_NAME))
        // alert(JSON.stringify(props.route?.params?.ApplicantsData))
    }, [])


    const assignInterview = async (date) => {
        setCreditModal(false)
        let data = {}
        data["user_id"] = userId;
        data["job_applied_id"] = selectedApplicant?.JOB_APPLIED_ID;
        data["status"] = "initiated";
        data["date"] = moment(date).format("yy-MM-DD");
        data["time"] = moment(date).format("HH:mm:ss");
        const res = await Axios("assign_interview.php", data);
        alert(JSON.stringify(res.message))
        // alert(JSON.stringify(data))
    }

    return (
        <View style={styles.container}>
            <Header_ title="Applicants" />
            <View style={{ marginHorizontal: wp(4), flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    data={props.route?.params?.ApplicantsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <ApplicantCard item={item} onPress={() => chatHeadPress(item)}
                            msgPress={() => props.navigation.navigate("ChatScreen", { item: item })} />
                    )} />
            </View>

            <DatePicker
                modal
                mode={"datetime"}
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    assignInterview(date)
                    // setDate(date)
                    // alert(JSON.stringify(date))
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <Modal
                style={{ flex: 1 }}
                animationType="slide"
                transparent={true}
                visible={creditModal}
                onRequestClose={() => { setCreditModal(false) }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    <View style={[styles.inputContainer]}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: wp(-7) }}>Assign Interview</Text>
                        <Text style={{ textAlign: "center", width: wp(70), marginTop: 10 }}>Do you want to send interview invitation to applicant?</Text>
                        <Button onPress={() => {
                            setCreditModal(false),
                                props.navigation.navigate("VideoCall", {
                                    appId: props.route?.params?.ApplicantsData[0].APP_ID,
                                    channelName: props.route?.params?.ApplicantsData[0].CHANNEL_NAME
                                })
                        }}
                            title={"Call to Applicant"} />
                        {/* <Button onPress={() => props.navigation.navigate("VideoScreen", { ApplicantsData: props.route?.params?.ApplicantsData })} title={"Call to Applicant"} /> */}
                        <Button onPress={() => setOpen(true)} title={"Yes"} />
                        <Button onPress={() => setCreditModal(false)} title={"No"} backgroundColor={"#eee"} textColor={"#000"} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        position: "absolute",
        bottom: 0,
        width: wp(100),
        height: wp(85),
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: "center",
        justifyContent: "center"

    },
})
