import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Modal } from 'react-native'


import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import { iconPath } from '../../../Constants/icon';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import Axios from '../../../Components/Axios';
import moment from "moment";
import Loader from '../../../Components/Loader';
import Header_ from '../../../Components/Header';
import Button from '../../../Components/Button';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from 'react-native-date-picker'
import Image_Picker from '../../../Components/Image_Picker';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import ModalDropdown from 'react-native-modal-dropdown';
import _imageUpload from "../../../Components/_imageUpload";
import RNFS from 'react-native-fs';

export default function PostJob(props) {

    const [Title, setTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [categories, setCategories] = useState([])
    const [desp, setDesp] = useState("")
    const [locModal, setLocModal] = useState(false)
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [Address, setAddress] = useState("")
    const [DropDownItem, setDropDownItem] = useState('Category')
    const [selectedCategoryId, setSelectedCategoryId] = useState('')

    const [picture, setPicture] = useState("")
    const [picType, setPicType] = useState("")
    const [picBase64, setPicBase64] = useState("")
    const [pictureSelected, setpictureSelected] = useState(false)

    const [video, setVideo] = useState("")
    const [vidType, setVidType] = useState("")
    const [vidBase64, setVidBase64] = useState("")
    const [videoSelected, setVideoSelected] = useState(false)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const userId = useSelector(state => state.AuthReducer.userId);

    useEffect(() => {
        readCategory()
    }, [])

    const setLocationFun = (location, address) => {
        setLat(location.lat)
        setLong(location.lng)
        setAddress(address)
        setLocModal(false)
    }
    const openCamera = async (type) => {
        const res = await Image_Picker(type);
        // console.log("cameraaeResss\n", res);
        if (res === false || res === "cancel") {
            return;
        }
        if (type == "gallery") {
            setpictureSelected(true)
            setPicture(res.path)
            setPicType(res.mime)
            setPicBase64(res.data)
        } else {
            var data = await RNFS.readFile( res.path, 'base64').then(res => { return res });
            // console.log("video000====>",data)
            setVideoSelected(true)
            setVideo(res.path)
            setVidType(res.mime)
            setVidBase64(data)
        }
    }
    const readCategory = async () => {
        let data = {}
        data["id"] = userId;
        try {
            const res = await Axios("read_category.php", data);
            setCategories(res.message)
            // alert(JSON.stringify(res.message))
        } catch (error) {
        }
    }
    const PostJobFun = async () => {
        if (Title == '') {
            alert("Please Enter Title")
        }
        else if (salary == '') {
            alert("Please Enter Salary")
        }
        else if (selectedCategoryId == '') {
            alert("Please Select Category")
        }
        else if (desp == '') {
            alert("Please Enter Job Description")
        }
        else if (Address == '') {
            alert("Please Enter Job Location")
        }
        else if (date == new Date()) {
            alert("Please Enter Job End Date")
        }
        else {
            let Alldata = [
                {
                    name: 'user_id',
                    data: userId.toString(),
                },
                {
                    name: 'title',
                    data: Title,
                },
                {
                    name: 'salary',
                    data: salary.toString(),
                },
                {
                    name: 'cat_id',
                    data: selectedCategoryId,
                },
                {
                    name: 'description',
                    data: desp,
                },
                {
                    name: 'video_s',
                    data: videoSelected ? '1' : '0',
                },
                {
                    name: 'image_s',
                    data: pictureSelected ? '1' : '0',
                },
                {
                    name: 'latitude',
                    data: lat.toString(),
                },
                {
                    name: 'longitude',
                    data: long.toString(),
                },
                {
                    name: 'enddate',
                    data: moment(date).format("yy-MM-DD"),
                },
                {
                    name: 'location',
                    data: Address,
                },
                {
                    name: 'image',
                    filename: `image${Math.floor(new Date().getTime())}.${picType?.split('/')[1]}`,
                    type: picType,
                    data: picBase64,
                },
                {
                    name: 'video',
                    filename: `video${Math.floor(new Date().getTime())}.${vidType?.split('/')[1]}`,
                    type: vidType,
                    data: vidBase64,
                },
            ]
            setLoading(true)
            const res = await _imageUpload("add_job.php", Alldata);
            setLoading(false)
            if (res.includes("Record created successfully!")) {
                alert("Record created successfully")
                setTitle('')
                setSalary('')
                setDesp('')
                setDesp('')
                setpictureSelected(false)
                setVideoSelected(false)
                setDate(new Date())
                setAddress('')
            } 
        }
    }
    const renderDropDownCate = (rowData) => {
        const { ID, NAME } = rowData;
        return (
            <View style={{ backgroundColor: "#fff" }}>
                <TouchableOpacity
                    activeOpacity={0.4}
                    underlayColor="#ffffff00"
                    style={{ marginVertical: 10, marginLeft: 8 }}>
                    <Text style={[{ fontSize: 15, color: "#000", }]}>{NAME}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const renderButtonText1 = (rowData) => {
        const { ID, NAME } = rowData;
        return <View><Text style={[{ color: "#000", fontSize: wp(4), }]}>{NAME}</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Header_ />
            <View style={{ padding: wp(4) }}>
                <TextInput placeholder={"Title"} style={{ fontSize: 17, borderWidth: .8, borderRadius: 10, paddingHorizontal: 10 }}
                    value={Title} onChangeText={(txt) => setTitle(txt)}
                />

                <TextInput placeholder={"Salary"} style={{ fontSize: 17, marginTop: 9, borderWidth: .8, borderRadius: 10, paddingHorizontal: 10 }}
                    value={salary} onChangeText={(txt) => setSalary(txt)}
                    keyboardType={"number-pad"}
                />

                <ModalDropdown options={categories}
                    defaultValue={DropDownItem}
                    style={styles.dropDown}
                    dropdownStyle={styles.dropDown_dropDownStyle}
                    dropdownTextStyle={styles.dropDown_textStyle}
                    renderRow={(rowData, rowID) => renderDropDownCate(rowData, rowID)}
                    renderButtonText={(rowData) => renderButtonText1(rowData)}
                    textStyle={{ color: "#000", marginLeft: 10, fontSize: 16, width: "90%" }}
                    onSelect={(idx, DropDownItem) => { setDropDownItem(DropDownItem.NAME), setSelectedCategoryId(DropDownItem.ID) }}
                    renderRightComponent={() => (<AntDesign name="caretdown" size={12} style={styles.dropDownIcon} />)} />


                <TextInput placeholder={"Description"} style={{ fontSize: 17, marginTop: 9, borderWidth: .8, borderRadius: 10, paddingHorizontal: 10 }}
                    value={desp} onChangeText={(txt) => setDesp(txt)}
                />

                <Pressable onPress={() => openCamera("gallery")} style={{ borderWidth: .8, borderRadius: 10, marginTop: 9, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TextInput placeholder={"Date"} style={{ fontSize: 17, flex: 1, color: "#000" }} value={"Image"} editable={false}>
                    </TextInput>
                    {pictureSelected && <Ionicons name="checkmark-circle" size={27} color={Colors.BlueColor} />}
                </Pressable>
                <Pressable onPress={() => openCamera("videoGallery")} style={{ borderWidth: .8, borderRadius: 10, marginTop: 9, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TextInput placeholder={"Date"} style={{ fontSize: 17, flex: 1, color: "#000" }} value={"Video"} editable={false}>
                    </TextInput>
                    {videoSelected && <Ionicons name="checkmark-circle" size={27} color={Colors.BlueColor} />}
                </Pressable>

                <Pressable onPress={() => setOpen(true)} style={{ borderWidth: .8, borderRadius: 10, marginTop: 9, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TextInput placeholder={"Date"} style={{ fontSize: 17, flex: 1, color: "#000" }}
                        value={moment(date).format("yy-MM-DD")} editable={false}>
                    </TextInput>
                    <AntDesign name="calendar" size={21} />
                </Pressable>

                <Pressable onPress={() => setLocModal(true)} style={{ borderWidth: .8, borderRadius: 10, marginTop: 9, paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TextInput placeholder={"Address"} style={{ fontSize: 17, flex: 1, color: "#000" }}
                        value={Address} editable={false}>
                    </TextInput>
                </Pressable>

                <Button onPress={() => PostJobFun()}
                    title={"Add Job"} marginTop={wp(8)} />


                <Modal
                    style={{ flex: 1, }}
                    animationType="slide"
                    transparent={true}
                    // visible={true}
                    visible={locModal}
                    onRequestClose={() => { setLocModal(false) }}>
                    <View style={{ flex: 1, backgroundColor: "#fff" }}>

                        <GooglePlacesAutocomplete
                            placeholder="Search your location"
                            fetchDetails={true}
                            returnKeyType={"search"}
                            showsMyLocationButton={true}
                            onPress={(data, details = null) => {
                                setLocationFun(details.geometry.location, data.description)
                            }}
                            styles={{
                                textInputContainer: {
                                    backgroundColor: "white",
                                    width: "100%",
                                    marginTop: "5%",
                                    alignSelf: "center",
                                    // flex: 1,
                                },
                                textInput: {
                                    marginLeft: 10,
                                    marginRight: 10,
                                    borderRadius: 10,
                                    height: 50,
                                    width: "90%",
                                    color: "black",
                                    borderColor: "gray",
                                    elevation: 8,
                                    fontSize: 15,
                                    borderWidth: 2,
                                },
                                predefinedPlacesDescription: {
                                    // marginTop: '10%',
                                    color: "grey",
                                },
                                listView: {
                                    width: '95%'
                                },
                            }}
                            GooglePlacesSearchQuery={{ types: "city_hall" }}
                            query={{
                                key: "AIzaSyDt9GY0qjMwSFvi-ODbrRJFZg3wCwtZofc",
                                types: "address",
                                language: "en",
                            }}
                        />

                    </View>
                </Modal>

                <DatePicker
                    modal
                    // mode={"datetime"}
                    // mode={"time"}
                    mode={"date"}
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />

            </View>
            <Loader loading={loading} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dropDown_dropDownStyle: {
        width: "90%",
        borderWidth: 0,
    },
    dropDown_textStyle: {
        fontSize: 16,
        color: "#000",
    },
    dropDown: {
        height: 45,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 10,
        marginTop: 9,
        height: 50
    },
    dropDownIcon: {
        marginRight: 5
    },
})