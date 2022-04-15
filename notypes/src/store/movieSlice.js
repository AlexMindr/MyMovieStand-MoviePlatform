import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        name: '',
        role: '',
        token:'',
    },
    reducers: {
        logIn: (state, action) => {
            state.name = action.payload.name;
            state.role =action.payload.role;
            state.token = action.payload.token;
        },
        logOut: (state) => {
            state.name = '';
            state.role= '';
            state.token= '';
        },
    },
})
export const { logIn, logOut } = movieSlice.actions;



export default movieSlice.reducer;