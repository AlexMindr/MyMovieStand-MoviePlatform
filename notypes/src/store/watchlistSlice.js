import { createSlice } from '@reduxjs/toolkit'
import {
    getWatchlistInit as apigetWlInit,
    createWatchlistItem as apicreateWl,
    updateWatchlistItem as apiputWl,
    deleteWatchlistItem as apidelWl,
    remFavourite,
    addFavourite,
} from '../api'

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        watchlist:[],
        fetchedThisSession:false,
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
            state.fetchedThisSession=true
        },
        setAfterLogout:(state)=> {
            state.fetchedThisSession=false
            state.watchlist=[]
        },
        addToFav: (state,action) => {
            state.watchlist= state.watchlist.map((watchlistItem)=>
            watchlistItem.movieid===action.payload.movieid? watchlistItem.favourite=true : watchlistItem)
        },
        remFromFav: (state,action) => {
            state.watchlist= state.watchlist.map((watchlistItem)=>
            watchlistItem.movieid===action.payload.movieid? watchlistItem.favourite=false : watchlistItem)
        }


    },
})
export const { addwlItem,updatewlItem,deletewlItem,getWatchlist,setAfterLogout,addToFav,remFromFav } = watchlistSlice.actions;


export const actionAddToFav = (formData) => async dispatch =>{
    try{
        await addFavourite(formData)
        .then(res=>{
            dispatch(addToFav(formData))
                
        })}
        catch(err)  {
            const message=err.response.data.message
            return message
        }
}

export const actionRemFromFav = (formData) => async dispatch =>{
    try{
        await remFavourite(formData)
        .then(res=>{
            dispatch(remFromFav(formData))
                
        })}
        catch(err)  {
            const message=err.response.data.message
            return message
        }
}

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
    apidelWl(formData)
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