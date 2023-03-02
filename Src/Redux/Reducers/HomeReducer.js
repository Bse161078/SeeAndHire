import { HIDETAB } from '../Constants'
const initialState = {
    showTabBar: true,
};

const HomeReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case HIDETAB:
            return {
                ...state,
                showTabBar: payload,
            }
        default:
            return state;
    }
}
export default HomeReducer;