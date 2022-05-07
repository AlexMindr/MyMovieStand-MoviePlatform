import { createSlice } from '@reduxjs/toolkit'
import {} from '../api'


export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications:[],
        fetchedThisSession:false,
    },
    reducers: {
        addNotif: (state, action) => {
            state.notifications=[...state.notifications,action.payload]
            
        },
        updateNotif: (state,action) => {
            state.notifications= state.notifications.map((notificationsItem)=>
            notificationsItem.notificationid===action.payload.notificationid? action.payload : notificationsItem)
        },
        deleteNotif: (state,action) => {
            state.notifications= state.notifications.filter((notificationsItem)=> 
            notificationsItem.notificationid!==action.payload.notificationid)
        },
        getNotif:(state,action) => {
            state.notifications=[...action.payload.notifications]
            state.fetchedThisSession=true
        },
        setAfterLogout:(state)=> {
            state.fetchedThisSession=false
            state.notifications=[]
        },

        
    },
})
export const { getNotif,setAfterLogout,deleteNotif,updateNotif,addNotif } = notificationSlice.actions;




export default notificationSlice.reducer;
