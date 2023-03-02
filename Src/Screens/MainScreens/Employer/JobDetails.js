import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Modal, Pressable } from 'react-native';

import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { useSelector } from 'react-redux';
import Axios from '../../../Components/Axios';
import Button from '../../../Components/Button';
import Fonticon from '../../../Constants/FontIcon';
import LinearGradient from 'react-native-linear-gradient';

const JobDetails = (props) => {

    const userId = useSelector(state => state.AuthReducer.userId);
    const UserRole = useSelector(state => state.AuthReducer.UserRole);

    const [creditModal, setCreditModal] = useState(false)

    useEffect(() => {
        sendJobView()
        // alert(JSON.stringify(props.route.params?.JobDetails.VIDEOS))
        // console.log(JSON.stringify(props.route.params?.JobDetails.VIDEOS[0].VIDEO_URL))
    }, [])

    const sendJobView = async () => {
        let data = {}
        data["user_id"] = userId;
        data["job_id"] = props.route.params.JobDetails.ID;
        const res = await Axios("view_job.php", data);
    }

    const getJobApplicants = async () => {
        let data = {}
        data["user_id"] = userId;
        data["job_id"] = props.route.params?.JobDetails?.ID;
        const res = await Axios("view_job_applicant.php", data);
        props.navigation.navigate("Applicants", { ApplicantsData: res })
        // alert(JSON.stringify(res))
    }

    const applyJob = async () => {
        let data = {}
        data["user_id"] = userId;
        data["job_id"] = props.route.params?.JobDetails?.ID;
        const res = await Axios("apply_job.php", data);
        alert(JSON.stringify(res.message))
        setCreditModal(false)
    }

    // jobId
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: Colors.white, height: wp(78), borderBottomLeftRadius: 35 }}>
                <Image source={props.route.params?.JobDetails?.IMAGES == null ?iconPath.JobImage : { uri: props.route.params?.JobDetails?.IMAGES[0].IMAGE_URL }} style={{ width: "100%", height: wp(55), borderBottomLeftRadius: 35 }} />
                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={[Colors.blurBlue, Colors.blurBlue, Colors.blurWhite]} style={styles.linearGradient}>
                    <View style={{ top: wp(10), left: wp(5), position: "absolute", }}>
                        <Fonticon type={"Ionicons"} name={"arrow-back"} size={wp(7)} onPress={() => props.navigation.goBack()} />
                    </View>
                    {props.route.params?.JobDetails.VIDEOS != null &&
                        <Pressable onPress={()=> props.navigation.navigate("FullView", {mediaLink: props.route.params?.JobDetails?.VIDEOS[0]?.VIDEO_URL})} style={{ alignSelf: "center", backgroundColor: 'rgba(187, 187, 187, 0.5)', padding: 10, borderRadius: wp(100) }}>
                            <Fonticon type={"Ionicons"} name={"play"} size={wp(9)} />
                        </Pressable>}
                </LinearGradient>
                <View style={{ marginHorizontal: 20, marginVertical: 10, flexDirection: "row", }}>
                    <Image source={props.route.params?.JobDetails?.IMAGES == null ? iconPath.JobImage : { uri: props.route.params?.JobDetails?.IMAGES[0].IMAGE_URL }} style={{ width: wp(15), height: wp(15), borderRadius: 100 }} />
                    <View style={{ marginLeft: 10, marginTop: 5, flex: 1 }}>
                        <Text style={{}}>{props.route.params?.JobDetails?.TITLE?.toUpperCase()}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                            <Text numberOfLines={2} style={{ width: wp(55) }}>{props.route.params?.JobDetails?.LOCATION}</Text>
                            <Text style={{ backgroundColor: "#ccc", paddingHorizontal: 10, borderRadius: 15, alignSelf: "flex-end" }}>0.2km</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: wp(10) }}>
                <Text style={{ color: Colors.BlueColor, marginTop: 10, fontWeight: "bold" }}>POSITION</Text>
                <Text style={{ marginTop: 5 }}>{props.route.params?.JobDetails?.TITLE?.toUpperCase()}</Text>
                <Text style={{ color: Colors.BlueColor, marginTop: 20, fontWeight: "bold" }}>CATEGORY</Text>
                <View style={{ flexDirection: "row", marginTop: 10, }}>
                    <Text style={{ backgroundColor: "#ccc", paddingHorizontal: 10, borderRadius: 15, }}>{props.route.params?.JobDetails?.CATEGORY}</Text>
                    {/* <Text style={{ backgroundColor: "#ccc", paddingHorizontal: 10, borderRadius: 15, }}>Design</Text>
                    <Text style={{ backgroundColor: "#ccc", paddingHorizontal: 10, borderRadius: 15, }}>App UX</Text>
                    <Text style={{ backgroundColor: "#ccc", paddingHorizontal: 10, borderRadius: 15, }}>Sketch</Text> */}
                </View>
                <Text style={{ color: Colors.BlueColor, marginTop: 20, fontWeight: "bold" }}>DESCRIPTION</Text>
                <Text style={{ marginTop: 5, textAlign: "justify" }}>{props.route.params?.JobDetails?.DESCRIPTION}</Text>
            </View>
            <View style={{ backgroundColor: Colors.white, height: wp(20), position: "absolute", bottom: 0, width: wp(100), justifyContent: "center" }}>
                <Button title={UserRole == 'employer' ? "View Applicants" : "Apply"} marginTop={wp(13)} style={{ position: "absolute", }}
                    onPress={() => { UserRole == 'employer' ? getJobApplicants() : setCreditModal(true) }}
                />
            </View>


            <Modal
                style={{ flex: 1 }}
                animationType="slide"
                transparent={true}
                visible={creditModal}
                onRequestClose={() => { setCreditModal(false) }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    <View style={[styles.inputContainer]}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: wp(-7) }}>Spend Credit</Text>
                        <Text style={{ textAlign: "center", width: wp(70), marginTop: 10 }}>Do you want to use 1 unlock on contacting this Empolyee?</Text>
                        <Button onPress={() => applyJob()} title={"Yes"} />
                        <Button onPress={() => setCreditModal(false)} title={"No"} backgroundColor={"#eee"} textColor={"#000"} />
                    </View>
                </View>
            </Modal>

        </View>
    )
}
export default JobDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    linearGradient: {
        height: wp(55),
        width: wp(100),
        // flexDirection: "row",
        justifyContent: "center",
        borderBottomLeftRadius: 35,
        position: "absolute",
        // top:0
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        position: "absolute",
        bottom: 0,
        width: wp(100),
        height: wp(70),
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        alignItems: "center",
        justifyContent: "center"

    },
})