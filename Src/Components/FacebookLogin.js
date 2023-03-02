import { AccessToken, LoginManager } from "react-native-fbsdk";

const FacebookLogin = async () => {

    let result;
    try {
        LoginManager.setLoginBehavior('NATIVE_ONLY');
        result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    } catch (error) {
        LoginManager.setLoginBehavior('WEB_ONLY');
        result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    }
    if (result.isCancelled) {
        console.log('Signin cancelled.');
    } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            alert('Something went wrong obtaining the users access token');
        }
        const response = await fetch(`https://graph.facebook.com/v4.0/me?access_token=${data.accessToken}&fields=name,email,id,picture.type(large)`);
        var userInfo = await response.json();
        return { "Data": { userInfo } }
    }
    (error) => {
        console.warn('Sign in error', error);
        return { "Error": { error } }
    }

}

export default FacebookLogin;