import { createSlice } from '@reduxjs/toolkit'
import {
    getWatchlistInit as apigetWlInit,
    createWatchlistItem as apicreateWl,
    updateWatchlistItem as apiputWl,
    deleteWatchlistItem as apidelWl,
} from '../api'

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        watchlist:[]
    },
    reducers: {
        addwlItem: (state, action) => {
            state.watchlist=[...state.watchlist,action.payload]
            
        },
        updatewlItem: (state,action) => {
            state.watchlist= state.watchlist.map((watchlistItem)=>
            watchlistItem.movieid===action.payload.movieid? action.payload : watchlistItem)
        },
        deletewlItem: (state,action) => {
            state.watchlist= state.watchlist.filter((watchlistItem)=> 
            watchlistItem.movieid!==action.payload.movieid)
        },
        getWatchlist:(state,action) => {
            state.watchlist=[...action.payload.watchlist]
            
        },

    },
})
export const { addwlItem,updatewlItem,deletewlItem,getWatchlist } = watchlistSlice.actions;

export const actionGetWl = () => async dispatch => {
    apigetWlInit()
    .then(res=>{
        const watchlist=res.data
        dispatch(getWatchlist(watchlist))
    })
    .catch(err=>{
        console.error(err)
    })

}

export const actionDelWlItem = (formData) => async dispatch => {
    apidelWl()
    .then(res=>{
        dispatch(deletewlItem(formData))
    })
    .catch(err=>{
        console.error(err)
    })

}

export const actionCreateOrUpdateItem = (formData,action) => async dispatch => {
    
    if (action==='create')
        apicreateWl(formData)
        .then(res=>{
            const wlItem=formData
            dispatch(addwlItem(wlItem))
            
        })
        .catch(err=>{
            console.error(err)
        })
    if (action==='update')
        apiputWl(formData)
        .then(res=>{
            
            const wlItem=formData
            dispatch(updatewlItem(wlItem))
        })
        .catch(err=>{
            console.error(err)
        })
}


export default watchlistSlice.reducer;