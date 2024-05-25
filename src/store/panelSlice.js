import {createSlice} from '@reduxjs/toolkit';

const panelSlice  = createSlice({
    name: 'panel',
    initialState:{
        panel:'dashboard',
    },
    reducers:{
        setSelectedPanel(state, actions){
            state.panel = actions.payload;
        }
    }
});

export const {setSelectedPanel} = panelSlice.actions;

export default panelSlice.reducer;