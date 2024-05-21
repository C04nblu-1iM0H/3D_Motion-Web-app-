import {createSlice} from '@reduxjs/toolkit';

const authoreSlice  = createSlice({
    name: 'authore',
    initialState:{
        id:0,
    },
    reducers:{
        setAuthore(state, actions){
            state.id = actions.payload;
        },
    }
});

export const {setAuthore} = authoreSlice.actions;

export default authoreSlice.reducer;