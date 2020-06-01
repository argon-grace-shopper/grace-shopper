import axios from 'axios'

const SET_REVIEWS = 'SET_REVIEWS'
const GOT_NEW_REVIEW = 'GOT_NEW_REVIEW'

export const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    reviews,
  }
}

export const gotNewReview = (review) => ({
  type: GOT_NEW_REVIEW,
  review,
})

export const fetchReviews = (productId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${productId}/reviews`)
      dispatch(setReviews(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const postReview = (review, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/products/${productId}/reviews`,
        review
      )
      const newReview = response.data
      dispatch(gotNewReview(newReview))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS:
      return action.reviews
    case GOT_NEW_REVIEW: {
      return [...state, action.review]
    }
    default:
      return state
  }
}
