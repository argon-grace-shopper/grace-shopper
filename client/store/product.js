import Axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
// const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
// const DELETE_PRODUCT = 'DELETE_PRODUCT'
// const CREATE_PRODUCT = 'CREATE_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW'

export const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}
// export const setProduct = product => {
//   return {
//     type: SET_SINGLE_PRODUCT,
//     product
//   }
// }
// export const updateProduct = product => ({
//   type: UPDATE_PRODUCT,
//   product
// })
// export const deleteProduct = product => ({
//   type: DELETE_PRODUCT,
//   product
// })
// export const createProduct = product => ({
//   type: UPDATE_PRODUCT,
//   product
// })
export const addReview = review => ({
  type: ADD_REVIEW,
  review
})
export const fetchSingleProduct = id => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  } catch (err) {
    console.log(err)
  }
}
// export const setSingleProduct = id => {
//   return async dispatch => {
//     try {
//       const {data} = await Axios.get(`/api/products/${id}`)
//       dispatch(setProduct(data))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

// export const updateProduct = product => async (dispatch, getState) => {
//   try {
//     const { data: updateProduct } = await Axios.post(
//       `/api/products/${product.id}`,
//       product
//     );
//     dispatch(update(updateProduct));
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const deleteProduct = product => async (dispatch, getState) => {
//     try {
//       const { data: deleteProduct } = await Axios.delete(
//         `/api/products/${product.id}`,
//         product
//       );
//       dispatch(update(deleteProduct));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   export const createProduct = product => async (dispatch, getState) => {
//     try {
//       const { data: createProduct } = await Axios.post(
//         `/api/products/${product.id}`,
//         product
//       );
//       dispatch(update(createProduct));
//     } catch (err) {
//       console.log(err);
//     }
//   };
const initialProduct = {}
export default function productReducer(product = initialProduct, action) {
  switch (action.type) {
    // case SET_SINGLE_PRODUCT:
    //   return action.product
    case GET_SINGLE_PRODUCT:
      return {...initialProduct, product: action.product}
    // case UPDATE_PRODUCT:
    //   return action.product
    //   case ADD_REVIEW:
    //   return action.product;
    default:
      return product
  }
}
