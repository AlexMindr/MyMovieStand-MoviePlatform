import { createSlice } from '@reduxjs/toolkit'
import {signup as apisignUp,login as apilogIn} from '../api'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: (JSON.parse(localStorage.getItem('profile'))).token?(JSON.parse(localStorage.getItem('profile'))).user:'',
        token:(JSON.parse(localStorage.getItem('profile'))).token?(JSON.parse(localStorage.getItem('profile'))).token:'',
    },
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload.result;
            state.token = action.payload.token;
            const {user,token}=state
            localStorage.setItem("profile", JSON.stringify({token,user}));
        },
        logOut: (state) => {
            console.log('here2')
            state.user = '';
            state.token= '';
            localStorage.removeItem('profile');
        },
        signUp: (state, action) => {
            state.user = action.payload.result;
            state.token = action.payload.token;
            const {user,token}=state
            localStorage.setItem("profile", JSON.stringify({token,user}));
            
        },
    },
})
export const { logIn, logOut, signUp } = userSlice.actions;


export const actionLogOut = () => async dispatch => {
        dispatch(logOut())
        console.log('here')
}

export const actionSignUp = (formData) => async dispatch => {
        
        
        try{
        await apisignUp(formData)
        .then(res=>{
            dispatch(signUp(res.data))
                
        })}
        catch(err)  {
            const message=err.response.data.message
            return message
        }
        
        
}

export const actionLogin = (formData) => async dispatch => {
        
        
    try{
    await apilogIn(formData)
    .then(res=>{
        dispatch(logIn(res.data))
            
    })}
    catch(err)  {
        const message=err.response.data.message
        return message
    }
    
    
}

export default userSlice.reducer;
