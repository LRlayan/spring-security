import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "../service/userSlice.ts";

export const store = configureStore({
    reducer: {
        user: UserSlice,
    }
});

export type AppDispatch = typeof store.dispatch;