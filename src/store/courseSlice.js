import {createSlice} from '@reduxjs/toolkit';

const courseSlice  = createSlice({
    name: 'course',
    initialState:{
        courseName:"",
        courseDescription:"",
        loading:false,
        isClose:false,
    },
    reducers:{
        setCourseName(state, actions){
            state.courseName = actions.payload;
        },
        setCourseDescription(state, actions){
            state.courseDescription = actions.payload;
        },
        setLoading(state, actions){
            state.loading = actions.payload;
        },
        setIsClose(state, actions){
            state.isClose = actions.payload;
        },
        setIsSuccessCourse(state, actions){
            state.isSuccess = actions.payload;
        },
    }
});

export const {setCourseName, setCourseDescription, setLoading, setIsClose, setIsSuccessCourse} = courseSlice.actions;

export default courseSlice.reducer;