import { createSlice } from '@reduxjs/toolkit'
import {getNotification,updateNotification,addNotificationUser,deleteNotification} from '../api'


export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications:[],
        fetchedThisSessionNotif:false,
    },
    reducers: {
        addNotif: (state, action) => {
            state.notifications=[...state.notifications,action.payload]
            
        },
        updateNotif: (state,action) => {
            state.notifications= state.notifications.map((notificationsItem)=>
            notificationsItem.notificationid===action.payload?  ({...notificationsItem,read:true})  : notificationsItem)
        },
        deleteNotif: (state,action) => {
            state.notifications= state.notifications.filter((notificationsItem)=> 
            notificationsItem.notificationid!==action.payload)
        },
        getNotif:(state,action) => {
            state.notifications=[...action.payload]
            state.fetchedThisSessionNotif=true
        },
        setAfterLogout:(state)=> {
            state.fetchedThisSessionNotif=false
            state.notifications=[]
        },

        
    },
})
export const { getNotif,setAfterLogout,deleteNotif,updateNotif,addNotif } = notificationSlice.actions;


export const actionGetNotif = () => async dispatch => {
    getNotification()
    .then(res=>{
        //console.log(res.data)
        const notifs=res.data
        dispatch(getNotif(notifs))
    })
    .catch(err=>{
        console.error(err)
    })

}

export const actionUpdateNotif = (notificationid) => async dispatch => {
    updateNotification(notificationid)
    .then(res=>{
        if(res.data.message==="Success")
            dispatch(updateNotif(notificationid))
    })
    .catch(err=>{
        console.error(err)
    })

}

export const actionDeleteNotif = (notificationid) => async dispatch => {
    deleteNotification(notificationid)
    .then(res=>{
        if(res.data.message==="Success")
            dispatch(deleteNotif(notificationid))
    })
    .catch(err=>{
        console.error(err)
    })

}

export const actionAddNotif = (formData) => async dispatch => {
    addNotificationUser(formData)
    .then(res=>{
            dispatch(addNotif(res.data))
    })
    .catch(err=>{
        console.error(err)
    })

}

export default notificationSlice.reducer;
