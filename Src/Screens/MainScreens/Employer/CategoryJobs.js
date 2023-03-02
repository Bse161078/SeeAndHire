import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Axios from '../../../Components/Axios';
import Header_ from '../../../Components/Header';
import Fonticon from '../../../Constants/FontIcon';
import { wp } from '../../../Helpers/Responsiveness';
import { iconPath } from '../../../Constants/icon';
import { CHAT_HEAD } from '../../../Helpers/Moko';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const CategoryJobs = (props) => {

    const userId = useSelector(state => state.AuthReducer.userId);
    const UserRole = useSelector(state => state.AuthReducer.UserRole);

    const [allJobs, setAllJobs] = useState([])
    const [noJob, setNoJob] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            readJobs()
            // alert(JSON.stringify(props.route.params.item.ID))
            // readSelfJobs()
        }, [])
    )

    const readJobs = async () => {
        let data = {}
        data["id"] = userId;
        data["category_id"] = props.route.params.item.ID;
        const res = await Axios("read_category_jobs.php", data);
        if (res.status == 3) {
            setNoJob(true)
        } else {
            setAllJobs(res?.reverse())
            setNoJob(res.length > 0 ? false : true)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Header_ title={"My Jobs"}
                left={UserRole == 'employer' ? true : false}
                Emptyleft={UserRole == 'employer' ? false : true}
                type={"Feather"} name={"plus"}
                onLeftPress={() => props.navigation.navigate("PostJob")} />
            <View style={{ flex: 1, marginHorizontal: wp(5), marginTop: wp(-10) }}>
                {!noJob ?
                    <FlatList
                        data={allJobs}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.BoxStyle}
                                onPress={() => props.navigation.navigate("JobDetails", { JobDetails: item })}>
                                <Image source={item.IMAGES == null ? iconPath.JobImage : { uri: item.IMAGES[0].IMAGE_URL }} style={{ width: "100%", height: wp(45), borderBottomLeftRadius: 20, borderBottomRightRadius: 20, resizeMode: "cover" }} />
                                <View style={{ marginHorizontal: wp(4), marginVertical: wp(4) }}>
                                    <Text style={{}}>{item?.TITLE && item?.TITLE.toUpperCase()}</Text>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                                        <Text numberOfLines={2} style={{ width: wp(69) }}>{item.LOCATION}</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Fonticon type={"Ionicons"} name={"person"} size={wp(5.5)} color={"blue"} />
                                            <Text style={{ backgroundColor: "red", paddingHorizontal: 10, borderRadius: 15, height: wp(5), marginLeft: 7 }}>  </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )} />
                    :
                    <Text style={{ fontWeight: "bold", fontSize: 22, position: "absolute", top: "40%", alignSelf: "center" }}>{"No Jobs"}</Text>
                }
            </View>
        </View>
    )
}
export default CategoryJobs;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    BoxStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: "#fff",
        marginTop: wp(5),
        borderBottomColor: "blue",
        borderBottomWidth: 2
    }
})