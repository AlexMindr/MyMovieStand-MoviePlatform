import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        result: '',
        token:'',
    },
    reducers: {
        logIn: (state, action) => {
            state.result = action.payload.result;
            state.token = action.payload.token;
        },
        logOut: (state) => {
            state.result = '';
            state.token= '';
        },
        signUp: (state, action) => {
            state.result = action.payload.result;
            state.token = action.payload.token;
        },
    },
})
export const { logIn, logOut, signUp } = userSlice.actions;

export const isLoggedIn = (state) => {
    return !!state.user.name;
};

export default userSlice.reducer;