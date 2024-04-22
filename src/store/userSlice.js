import {createSlice} from '@reduxjs/toolkit';

const regUserSlice  = createSlice({
    name: 'regUser',
    initialState:{
        email: '',
        password: '',
        role:0,
        isOnlineCount:0,
        countUsers:0,
        isLoading:false,
        isVisible:false,
        isLoadingGoogle:false,
    },
    reducers:{
        setEmail(state, actions){
            state.email = actions.payload;
        },
        setPassword(state, actions){
            state.password = actions.payload;
        },
        setUserRole(state, actions){
            state.role = actions.payload;
        },
        setCountUsersOnline(state, actions){
            state.isOnlineCount = actions.payload;
        },
        setCountUsers(state, actions){
            state.countUsers = actions.payload;
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

export const {setEmail, 
              setPassword,
              resetForm,
              setIsLoading,
              setIsVisible,
              setIsLoadingGoogle,
              setUserRole,
              setCountUsersOnline,
              setCountUsers} = regUserSlice.actions;

export default regUserSlice.reducer;