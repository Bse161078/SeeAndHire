import { GoogleSignin } from 'react-native-google-signin';

const GoogleSign = async () => {
    GoogleSignin.configure({
        scopes: ['email'],
        webClientId: '350331536704-go3o1ejv02cpl1id6ag4e3eanoqjsaid.apps.googleusercontent.com',
        offlineAccess: true,
    })
    try {
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        if (userInfo !== "") {
            return { "Data": { userInfo } }
        }
    } catch (error) {
        return { "Error": { error } }
    }
}

export default GoogleSign;