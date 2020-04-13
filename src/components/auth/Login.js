import React, { Component } from 'react'
import axios from "axios"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loginErrors: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/sessions',
    {
      user: {
      email: this.state.email,
      password: this.state.password
      }
    },
    { withCredentials: true }
    )
    .then(response => {
      console.log("res from login", response);
      if (response.data.logged_in) {
      this.props.handleSuccessfulAuth(response.data)
    }
    })
    .catch(err => {
      console.log("login error", err);
    })
  }


  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
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

          <button type="submit">Login</button>
      </form>
      </div>
    )
  }
}
