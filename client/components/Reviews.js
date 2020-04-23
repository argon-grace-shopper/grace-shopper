import React from 'react'

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
      // const res = await axios.post("/api/campuses", {
      //   name: this.state.name,
      //   address: this.state.address,
      //   description: this.state.description
      // });
      // console.log(res.data);

      this.props.postCampus(this.state)
      this.props.getCampuses()

      this.setState({
        name: '',
        address: '',
        description: ''
      })
      this.clickStatus = false
    } catch (err) {
      console.log(err)
      this.setState({
        name: ''
      })
    }
  }

  componentDidMount() {
    if (this.props.user.product.productId) this.reviewFlag = true
  }

  render() {
    const reviews = this.props.reviews
    const productId = this.props.productId

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
        {this.reviewFlag && (
          <div className="reviews-panel">
            <h3>Add Review (100 word minimum)</h3>
            <input type="text" name="reviewBody" />
            <button type="submit">Submit</button>
          </div>
        )}
      </div>
    )
  }
}

export default Review
