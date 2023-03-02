import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { wp } from '../Helpers/Responsiveness';
import { Colors } from '../Constants/Colors';
import Fonticon from '../Constants/FontIcon';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Header = ({ title, type, name, right, left, Emptyleft, ...props }) => {
    return (
        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={[Colors.BlueColor, Colors.BlueColor, '#A6ABF9']} style={styles.linearGradient}>
            {right &&

                <Pressable onPress={props.onRightPress} style={{ flex: 1 }}>
                    <Fonticon type={type} name={name} size={wp(7)} style={{ marginLeft: wp(5) }} />
                </Pressable>
            }

            {right ?
                <View style={{ flex: 1 }}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
                :
                <View style={{ flex: 1, }}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            }
            {left &&
                <Pressable onPress={props.onLeftPress}
                    style={{ flex: 1, alignItems: "flex-end" }}>
                    {props.employeeType == 'employer' ?
                        <Fonticon type={type} name={name} size={wp(7)} style={{ marginRight: wp(5) }} />
                        :
                        <Fonticon type={type} name={name} size={wp(7)} style={{ marginRight: wp(5) }} />
                    }
                </Pressable>
            }
            {Emptyleft &&
                <Pressable style={{ flex: 1, alignItems: "flex-end" }}>
                </Pressable>
            }

        </LinearGradient>
    )
}
export default Header;
const styles = StyleSheet.create({
    linearGradient: {
        height: wp(35),
        // justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderBottomLeftRadius: 35
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#ffffff',
    },
});