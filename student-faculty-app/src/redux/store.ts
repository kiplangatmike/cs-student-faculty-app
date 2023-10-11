
// "use client";
// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import authReducer from "./authSlice";

// const store = configureStore({
//     reducer: {
//         auth: authReducer
//     }
// })

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import exp from 'constants';

const persistConfig = {
        key: "root",
        storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);