import { createSlice } from '@reduxjs/toolkit'
import {getUserReviewsAndLikes as apiGetRevAndLikes,
updateReview as apiUpdateReview,
addReview as apiAddReview,
deleteReview as apiDelReview} from '../api'


export const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews:[],
        likes:[],
        fetchedThisSessionRev:false,
        
    },
    reducers: {
        addReview: (state, action) => {
            state.reviews=[...state.reviews,action.payload]
            
        },
        
        deleteReview: (state,action) => {
            state.reviews= state.reviews.filter((reviewsItem)=> 
            reviewsItem.movieid!==action.payload.movieid)
        },
        getReviewsAndLikes:(state,action) => {
            state.reviews=[...action.payload.reviews]
            state.likes=[...action.payload.likes]
            state.fetchedThisSessionRev=true
        },
        setAfterLogout:(state)=> {
            state.fetchedThisSessionRev=false
            state.reviews=[]
            state.likes=[]
        },

        
    },
})
export const { getReviewsAndLikes,setAfterLogout,deleteReview,updateReview,addReview } = reviewSlice.actions;

export const actionDeleteReview = (movieid) => async dispatch => {
    console.log(1)
    apiDelReview(movieid)
    .then(res =>{
        console.log(2)
        dispatch(deleteReview(movieid))
    })
    .catch(err=>{
        console.error(err)
    })
}

export const actionGetRevAndLikes = () => async dispatch => {
    apiGetRevAndLikes()
    .then(res=>{
        dispatch(getReviewsAndLikes(res.data))
    })
    .catch(err=>{
        console.error(err)
    })

}

export const actionCreateOrUpdateReview = (formData,action) => async dispatch => {
    
    if (action==='create')
        try{
            await apiAddReview(formData)
            .then(res=>{
                const {movieid}=formData
                dispatch(addReview({movieid}))
                
            })}
            catch(err)  {
                const message=err.response.data.message
                return message
            }
    if (action==='update')
        try {
            await apiUpdateReview(formData)
        }
        catch(err) {
            const message = err.response.data.message
            return message
        }
}


export default reviewSlice.reducer;