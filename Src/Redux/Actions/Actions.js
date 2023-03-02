import {
    SESSION, FIRSTTIME
} from '../Constants'

export const SetSession = (data) => {
    return {
        type: SESSION,
        payload: data,
    }
}
export const SetFirstTime = (data) => {
    return {
        type: FIRSTTIME,
        payload: data,
    }
}
