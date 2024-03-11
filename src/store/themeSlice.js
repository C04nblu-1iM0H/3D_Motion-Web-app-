import {createSlice} from '@reduxjs/toolkit';

const themeSlice  = createSlice({
    name: 'theme',
    initialState:{
        theme:false,
    },
    reducers:{
        setToggleMode(state, actions){
            state.theme = actions.payload;
        }
    }
});

export const {setToggleMode} = themeSlice.actions;

export default themeSlice.reducer;