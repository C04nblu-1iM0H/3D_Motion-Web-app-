import {createSlice} from '@reduxjs/toolkit';

const adminPanelSlice  = createSlice({
    name: 'adminPanelInfo',
    initialState:{
        isOnlineCount:0,
        totalUser:0,
        totalCourse:0,
    },
    reducers:{
        setTotalUsersOnline(state, actions){
            state.isOnlineCount = actions.payload;
        },
        setTotalUsers(state, actions){
            state.totalUser = actions.payload;
        },
        setTotalCourse(state, actions){
            state.totalCourse = actions.payload;
        }
    }
});

export const { setTotalUsersOnline, setTotalUsers, setTotalCourse} = adminPanelSlice.actions;

export default adminPanelSlice.reducer;