import React, { Component } from 'react'
import axios from "axios"

export default class Create Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      maps: []
    }
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/clients',
    {
      client: {
        f_name: this.state.f_name,
        l_name: this.state.l_name,
        birth_day: this.state.birth_day,
        birth_month: this.state.birth_month,
        birth_year: this.state.birth_year,
        license: this.state.license,
      }
    },
    )
    .then(response => {
      console.log("res from create-profile", response);
  //     if (response.data.status === "created") {
  //       this.clients
  //   }
  //   })
  //   .catch(err => {
  //     console.log("login error", err);
    })
  }


  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>

      <input
        type='text'
        name='f_name'
        placeholder='First Name'
        value={this.state.f_name}
        onChange={this.handleChange}
        required
      />

      <input
        type='text'
        name='l_name'
        placeholder='Last Name'
        value={this.state.l_name}
        onChange={this.handleChange}
        required
      />

      <input
        type='number'
        name='birth_day'
        placeholder='Enter Day of Birth (0-31)'
        value={this.state.birth_day}
        onChange={this.handleChange}
        required
      />

      <input
        type='number'
        name='birth_month'
        placeholder='Enter Birth Month (0-12)'
        value={this.state.birth_month}
        onChange={this.handleChange}
        required
      />

      <input
        type='number'
        name='birth_year'
        placeholder='Enter Birth year (0000)'
        value={this.state.birth_year}
        onChange={this.handleChange}
        required
      />

      <input
        type='text'
        name='license'
        placeholder='Enter PT License number for first state'
        value={this.state.email}
        onChange={this.handleChange}
        required
      />

          <button type="submit">Login</button>
      </form>
      </div>
    )
  }
}
