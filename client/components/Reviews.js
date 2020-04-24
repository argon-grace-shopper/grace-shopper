import React from 'react'
import {connect} from 'react-redux'
import {fetchReviews, postReview} from '../store/reviews'
import {fetchMyProducts} from '../store/user'

export class Review extends React.Component {
  constructor() {
    super()
    this.reviewFlag = false
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      reviewBody: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    try {
      event.preventDefault()

      const review = {
        description: this.state.reviewBody,
        productId: this.props.productId,
        userId: 1
      }
      this.props.postReview(review, this.props.productId)
      this.setState({
        reviewBody: ''
      })
      this.props.getReviews(this.props.productId)
    } catch (err) {
      console.log(err)
      this.setState({
        reviewBody: ''
      })
    }
  }

  componentDidMount() {
    this.props.getReviews(this.props.productId)
    this.props.getMyProducts()
    window.setTimeout(() => {
      if (this.props.user.myProducts.includes(this.props.productId)) {
        this.reviewFlag = true
      }
    }, 2000)
  }

  render() {
    const reviews = this.props.reviews
    const productId = this.props.productId
    const userId = this.props.userId

    console.log('heyyy', this.props.user.myProducts)

    return (
      <div className="reviews-container">
        {reviews ? (
          reviews.map(review => {
            return (
              <div key={review.id} className="reviews-panel">
                <p>{review.description}</p>
                <p>Posted: {review.createdAt}</p>
              </div>
            )
          })
        ) : (
          <h3>No Reviews</h3>
        )}
        {this.props.user.myProducts &&
          this.reviewFlag && (
            <div className="reviews-panel">
              <h3>Add Review (100 word minimum)</h3>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="reviewBody"
                  value={this.state.reviewBody}
                  onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    reviews: state.reviews,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getReviews: productId => dispatch(fetchReviews(productId)),
    postReview: (review, productId) => dispatch(postReview(review, productId)),
    getMyProducts: () => dispatch(fetchMyProducts())
  }
}

export default connect(mapState, mapDispatch)(Review)
