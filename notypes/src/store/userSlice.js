import { createSlice } from '@reduxjs/toolkit'
import {signup as apisignUp,login as apilogIn,verify as verifyToken} from '../api'
import { actionGetWl } from './watchlistSlice';
import { useDispatch } from 'react-redux';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:'',
        token:'',
    },
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload.result;
            state.token = action.payload.token;
            const {user,token}=state
            localStorage.setItem("profile", JSON.stringify({token,user}));
        },
        logOut: (state) => {
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
        tokenVerifySuccess:(state,action) => {
            state.user =  JSON.parse(localStorage.getItem('profile')).user
            state.token = action.payload.token
        },
        tokenVerifyFailed:(state) => {
            state.user =  ''
            state.token = ''
            localStorage.removeItem('profile');
        },
        
    },
})
export const { logIn, logOut, signUp, tokenVerifySuccess,tokenVerifyFailed } = userSlice.actions;


export const actionVerify = () => async dispatch => {
    verifyToken()
    .then(res=>{
        const token = res.data
        
        dispatch(tokenVerifySuccess(token))
    })
    .catch(err=>{
        dispatch(tokenVerifyFailed())
        //useNavigate('/')
    })

}
//TODO De pus ca param navigator pt pag
export const actionLogOut = () => async dispatch => {
        dispatch(logOut())
        
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
