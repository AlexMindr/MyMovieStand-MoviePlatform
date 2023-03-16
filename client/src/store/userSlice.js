import { createSlice } from '@reduxjs/toolkit'
import {signup as apisignUp,login as apilogIn,verify as verifyToken,update as apiupdateUser} from '../api'


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:localStorage.getItem('profile')?JSON.parse(localStorage.getItem('profile'))?.user:'',
        token:localStorage.getItem('profile')?JSON.parse(localStorage.getItem('profile'))?.token:'',
        verifiedThisSession:false,
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
            state.verifiedThisSession=true
        },
        tokenVerifyFailed:(state) => {
            state.user =  ''
            state.token = ''
            localStorage.removeItem('profile');
        },
        updateUser: (state,action) => {
            state.user= action.payload
            const {user,token}=state
            localStorage.setItem("profile", JSON.stringify({token,user}));
        },
        
    },
})
export const { logIn, logOut, signUp, tokenVerifySuccess,tokenVerifyFailed,updateUser } = userSlice.actions;

export const actionUpdateProfile = (formData,navigate,to) => async dispatch =>{
    try{
        await apiupdateUser(formData)
        .then(res=>{
            dispatch(updateUser(res.data.result))
            navigate(to, { replace: true });
        })}
        catch(err)  {
            const message=err.response.data.message
            return message
        }
        
}

export const actionVerify = () => async dispatch => {
    verifyToken()
    .then(res=>{
        const token = res.data
        dispatch(tokenVerifySuccess(token))
        
    })
    .catch(err=>{
        //console.error(err)
        dispatch(tokenVerifyFailed())
        //useNavigate('/')
    })

}
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

export const actionLogin = (formData,navigate,from) => async dispatch => {
        
        
    try{
    await apilogIn(formData)
    .then(res=>{
        dispatch(logIn(res.data))
        navigate(from, { replace: true });
    })}
    catch(err)  {
        const message=err.response.data.message
        return message
    }
    
    
}

export default userSlice.reducer;
