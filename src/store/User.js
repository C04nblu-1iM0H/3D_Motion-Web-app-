import {createSlice} from '@reduxjs/toolkit';

const regUserSlice  = createSlice({
    name: 'regUser',
    initialState:{
        email: '',
        password: '',
        isLoading:false,
        isVisible:false,
    },
    reducers:{
        setEmail(state, actions){
            state.email = actions.payload;
        },
        setPassword(state, actions){
            state.password = actions.payload;
        },
        resetForm: (state) => {
            state.email = '';
            state.password = '';
        },
        setIsLoading(state, actions){
            state.isLoading = actions.payload;
        },
        setIsVisible(state, actions){
            state.isVisible = actions.payload;
        },
    }
});

export const {setEmail, setPassword, resetForm, setIsLoading, setIsVisible} = regUserSlice.actions;

export default regUserSlice.reducer;