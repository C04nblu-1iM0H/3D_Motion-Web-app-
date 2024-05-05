import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { 
        persistStore,
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
     } from 'redux-persist'
import st from './storage';
import themeReducer from './themeSlice';
import userReducer from './userSlice'
import userProfileReducer from './userProfileSlice';
import panelReducer from './panelSlice';
import adminPanelReducer from './adminPanelSlice';
import courseReducer from './courseSlice';
import lessonReducer from './lessonSlice';

const rootReducer = combineReducers({
    panel: panelReducer,
    theme: themeReducer,
    user: userReducer,
    userProfile: userProfileReducer,
    adminPanelInfo:adminPanelReducer,
    course:courseReducer,
    lesson:lessonReducer,
})

const persistConfig = {
    key: 'root',
    storage: st,
    blacklist: ['panel', 'course'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);