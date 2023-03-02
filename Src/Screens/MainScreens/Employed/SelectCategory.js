import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

import { wp } from '../../../Helpers/Responsiveness';
import { Colors } from '../../../Constants/Colors';
import { useSelector } from 'react-redux';

import Axios from '../../../Components/Axios';
import Header_ from '../../../Components/Header';
import CategoryCard from './CategoryCard';

export default function SelectCategory(props) {

    const userId = useSelector(state => state.AuthReducer.userId);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        readCategory()
    }, [])

    const readCategory = async () => {
        let data = {}
        data["id"] = userId;
        try {
            const res = await Axios("read_category.php", data);
            setCategories(res?.message)
        } catch (error) {
        }
    }

    return (
        <View style={styles.container}>
            <Header_ title="Select a Category" />
            <View style={{ marginHorizontal: wp(7), flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={categories}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <CategoryCard item={item}
                            onPress={() => props.navigation.navigate("CategoryJobs", {item: item})} />
                    )} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
})
