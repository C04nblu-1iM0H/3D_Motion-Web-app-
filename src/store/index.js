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
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import themeReducer from './themeSlice';
import regUserReducer from './userSlice'
import userProfileReducer from './userProfileSlice';
import panelReducer from './panelSlice';

const rootReducer = combineReducers({
    panel: panelReducer,
    theme: themeReducer,
    regUser: regUserReducer,
    userProfile: userProfileReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    lacklist: ["panel"],
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