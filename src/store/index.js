import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import regUserReducer from './User';

export default configureStore({
    reducer:{
        theme: themeReducer,
        regUser: regUserReducer
    }
})