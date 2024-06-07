import {createSlice} from '@reduxjs/toolkit';

const panelSlice  = createSlice({
    name: 'panel',
    initialState:{
        panel:'false',
    },
    reducers:{
        setIsOpen(state, actions){
            state.panel = actions.payload;
        }
    }
});

export const {setIsOpen} = panelSlice.actions;

export default panelSlice.reducer;