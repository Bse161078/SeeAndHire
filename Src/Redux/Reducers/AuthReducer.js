import {
    SESSION, FIRSTTIME
} from '../Constants'
const initialState = {
    userId: '',
    isLogin: '',
    UserRole: '',
    firstTime: true
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.warn(payload)
    switch (type) {
        case SESSION:
            return {
                ...state,
                isLogin: payload.isLogin,
                userId: payload.userId,
                UserRole: payload.UserRole,
            }
        case FIRSTTIME:
            return {
                ...state,
                firstTime: payload,
            }
        default:
            return state;
    }

}
export default authReducer