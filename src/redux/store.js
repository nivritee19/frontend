import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // Key for the persist store
    version: 1,  // Version of the persist store
    storage,     // Storage engine to use (localStorage in this case)
};

// Combine the reducers for user and tweet slices
const rootReducer = combineReducers({
    user: userSlice,
    tweet: tweetSlice,
});

// Create a persisted reducer using the persist configuration and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer and middleware settings
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ], // Ignore these actions in the serializable check middleware
            },
        }),
});

// Export the configured store
export default store;
