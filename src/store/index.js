import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import regUserReducer from './userSlice'
import userProfileReducer from './userProfileSlice';

export default configureStore({
    reducer:{
        theme: themeReducer,
        regUser: regUserReducer,
        userProfile: userProfileReducer,
    }
})