import {createSlice} from '@reduxjs/toolkit';

const userProfileSlice  = createSlice({
    name: 'userProfile',
    initialState:{
        isEdit:true,
        name: '',
        surname: '',
        gender: 0,
        date: '',
        phone: '',
        isLoading:false,
    },
    reducers:{
        setName(state, actions){
            state.name = actions.payload;
        },
        setSurname(state, actions){
            state.surname = actions.payload;
        },
        setGender(state, actions){
            state.gender = actions.payload !== null ? actions.payload : state.gender;
        },
        setDate(state, actions){
            state.date = actions.payload;
        },
        setPhone(state, actions){
            state.phone = actions.payload;
        },
        resetForm: (state) => {
            state.name = '';
            state.surname = '';
            state.gender = 0;
            state.date = '';
            state.phone = '';
        },
        setIsVisibleEdit(state, actions){
            state.isEdit = actions.payload;
        },
        setIsLoading(state, actions){
            state.isLoading = actions.payload;
        },
    }
});

export const {setEmail, setName, setSurname, setGender, setDate, setPhone, setIsVisibleEdit, setIsLoading, resetForm, setUserProfileData} = userProfileSlice.actions;

export default userProfileSlice.reducer;