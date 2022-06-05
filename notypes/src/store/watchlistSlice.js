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
        fetchedThisSessionWl:false,
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
            const newWl= state.watchlist.filter((watchlistItem)=> 
            watchlistItem.movieid!==action.payload)
            state.watchlist=newWl
        },
        getWatchlist:(state,action) => {
            state.watchlist=[...action.payload.watchlist]
            state.fetchedThisSessionWl=true
        },
        setAfterLogout:(state)=> {
            state.fetchedThisSessionWl=false
            state.watchlist=[]
        },
        addToFav: (state,action) => {
            state.watchlist= state.watchlist.map((watchlistItem)=>
            watchlistItem.movieid===action.payload.movieid? ({...watchlistItem,favourite:true}) : watchlistItem)
        },
        remFromFav: (state,action) => {
            state.watchlist= state.watchlist.map((watchlistItem)=>
            watchlistItem.movieid===action.payload.movieid? ({...watchlistItem,favourite:false}) : watchlistItem)
        }


    },
})
export const { addwlItem,updatewlItem,deletewlItem,getWatchlist,setAfterLogout,addToFav,remFromFav } = watchlistSlice.actions;

//TODO Delete from form

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

export const actionDelWlItem = (movieid) => async dispatch => {
    apidelWl(movieid)
    .then(res=>{
        dispatch(deletewlItem(movieid))
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