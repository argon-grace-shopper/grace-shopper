import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_REVIEW = 'ADD_REVIEW'

export const getSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  }
}

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
})

export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchUpdateProduct = (product) => async (dispatch) => {
  try {
    const {data: updateProduct} = await axios.put(
      `/api/products/${product.id}`,
      product
    )
    dispatch(getSingleProduct(updateProduct))
  } catch (err) {
    console.log(err)
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const {data: deleteProduct} = await axios.delete(`/api/products/${id}`)
    dispatch(getSingleProduct(deleteProduct))
  } catch (err) {
    console.log(err)
  }
}

const initialProduct = {}

export default function productReducer(product = initialProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...initialProduct, product: action.product}
    default:
      return product
  }
}
