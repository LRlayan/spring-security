import {UserModel} from "../model/userModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../api/api.ts";

const initialState: { user: UserModel | null, jwtToken: null, refreshToken: null, username: null, isAuthenticated: boolean, loading: boolean, error: string } = {
    user: null,
    jwtToken: null,
    refreshToken: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: ""
};

export type UserRootState = {
    user: {
        user: UserModel,
        jwtToken: null,
        refreshToken: null,
        username: null,
        isAuthenticated: boolean,
        loading: boolean,
        error: string
    }
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (user: UserModel) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await api.post("auth/register", user, {withCredentials: true});
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (user: UserModel) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await api.post("auth/login", user, {withCredentials: true});
            return response.data;
        } catch (e) {
            throw e;
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state,action) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.error = "Not Register with our system now. Please Try Again later!";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.error = "Can,t login to the system. Please Try Again later!";
            })
    }
});

export default userSlice.reducer;