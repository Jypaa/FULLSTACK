import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers:{
        setNotificationWithTimeout(state, action){
            return action.payload
        }
    }
    })

export const {setNotificationWithTimeout} = notificationSlice.actions


export const setNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch(setNotificationWithTimeout(notification))
        setTimeout(() => {
            dispatch(setNotificationWithTimeout(''))
        }, timeout*1000)
    }
}
export default notificationSlice.reducer