import axios from 'axios'

const SET_CATEGORIES = 'SET_CATEGORIES'

export const setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/categories')
      dispatch(setCategories(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
