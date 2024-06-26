import {createSlice} from '@reduxjs/toolkit';

const lessonSlice  = createSlice({
    name: 'lesson',
    initialState:{
        currentIdSelectedLesson:0,
        lessonName:"",
        lessonDescription:"",
        lessonMaterials:"",
        loading:false,
        isCloseLesson:false,
    },
    reducers:{
        setCurrentIdSelectedLesson(state, actions){
            state.currentIdSelectedLesson = actions.payload;
        },
        setLessonName(state, actions){
            state.lessonName = actions.payload;
        },
        setLessonDescription(state, actions){
            state.lessonDescription = actions.payload;
        },
        setLessonMaterials(state, actions){
            state.lessonMaterials = actions.payload;
        },
        setLoading(state, actions){
            state.loading = actions.payload;
        },
        setIsClose(state, actions){
            state.isCloseLesson = actions.payload;
        },
        resetFormLesson: (state) => {
            state.lessonName = '';
            state.lessonDescription = '';
            state.lessonMaterials = '';
        },
    }
});

export const {
    setLessonName, 
    setLessonDescription, 
    setLessonMaterials, 
    setLoading, 
    setIsClose, 
    setCurrentIdSelectedLesson,
    resetFormLesson} = lessonSlice.actions;

export default lessonSlice.reducer;