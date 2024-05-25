import {createSlice} from '@reduxjs/toolkit';

const userSlice  = createSlice({
    name: 'user',
    initialState:{
        id:0,
        email: '',
        password: '',
        role:0,
        isLoading:false,
        isVisible:false,
        isLoadingGoogle:false,
    },
    reducers:{
        setId(state, actions){
            state.id = actions.payload;
        },
        setEmail(state, actions){
            state.email = actions.payload;
        },
        setPassword(state, actions){
            state.password = actions.payload;
        },
        setUserRole(state, actions){
            state.role = actions.payload;
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
        setIsLoadingGoogle(state, actions){
            state.isLoadingGoogle = actions.payload;
        }
    }
});

export const {
              setId,
              setEmail, 
              setPassword,
              resetForm,
              setIsLoading,
              setIsVisible,
              setIsLoadingGoogle,
              setUserRole} = userSlice.actions;

export default userSlice.reducer;