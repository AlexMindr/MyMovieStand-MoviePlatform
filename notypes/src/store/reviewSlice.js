import { createSlice } from '@reduxjs/toolkit'
import {getUserReviewsAndLikes as apiGetRevAndLikes,
updateReview as apiUpdateReview,
addReview as apiAddReview,
deleteReview as apiDelReview,
likeReview as apiLikeRev,
dislikeReview as apiDislikeRev} from '../api'


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
        likeReview:(state,action) => {
            state.likes=state.likes.filter(likedItem=>likedItem.reviewid!==action.payload.reviewid)
            state.likes=[...state.likes,action.payload]
        }
        
    },
})
export const { getReviewsAndLikes,setAfterLogout,deleteReview,updateReview,addReview,likeReview } = reviewSlice.actions;

export const actionLikeReview = (formData) => async dispatch =>{
    apiLikeRev(formData)
    .then(res => {

        dispatch(likeReview(formData))
    })
    .catch(err=>{
        console.error(err)
    })

}

export const actionDislikeReview = (formData) => async dispatch =>{
    apiDislikeRev(formData)
    .then(res => {
        dispatch(likeReview(formData))
    })
    .catch(err=>{
        console.error(err)
    })

}
export const actionDeleteReview = (movieid) => async dispatch => {
    apiDelReview(movieid)
    .then(res =>{
        dispatch(deleteReview(movieid))
    })
    .catch(err=>{
        const message=err.response.data.message
        return message
    })

    // try{
    //     await apiupdateUser(formData)
    //     .then(res=>{
    //         dispatch(updateUser(res.data.result))
    //         navigate(to, { replace: true });
    //     })}
    //     catch(err)  {
            
    //     }
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