import React, { Component } from 'react'
import axios from "axios"

export default class Registration extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('https://git.heroku.com/ceutracker-react-frontend.git/registrations', {
      user: {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
      }
    },
    { withCredentials: true }
    )
    .then(response => {
      if (response.data.status === 'created') {
      this.props.handleSuccessfulAuth(response.data)
      this.props.toggleSignIn()
    }
    })
    .catch(err => {
      console.log("registration error", err);
    })
  }


  render() {
    return (
      <div>
      <form
      onSubmit={this.handleSubmit} onSubmit={this.toggleSignIn}>
      <input
        type='email'
        name='email'
        placeholder='Email'
        value={this.state.email}
        onChange={this.handleChange}
        required
      />

      <input
        type='password'
        name='password'
        placeholder='Password'
        value={this.state.password}
        onChange={this.handleChange}
        required
      />

      <input
        type='password'
        name='password_confirmation'
        placeholder='Password confirmation'
        value={this.state.password_confirmation}
        onChange={this.handleChange}
        required
      />

          <button type="submit">Register</button>
      </form>
      </div>
    )
  }
}
