import React, { Component } from "react"
import Registration from "./auth/Registration"
import Login from "./auth/Login"
import axios from "axios"
import { Button, Container } from 'react-bootstrap'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSignUp: false,
      showSignIn: false
    }
  }

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data)
    console.log(data);
    this.props.history.push('/dashboard')
  }

  handleLogoutClick = () => {
    axios.delete('https://git.heroku.com/ceutracker-react-frontend.git/logout', { withCredentials: true})
    .then(response => {
      this.props.handleLogout();
    })
    .catch(err => {
      console.log("logout error", err);
    })
  }

  toggleSignUp = (e) => {
    e.preventDefault()
    this.setState({
      showSignUp: !this.state.showSignUp
    })
  }

  toggleSignIn = (e) => {
    e.preventDefault()
    this.setState({
      showSignIn: !this.state.showSignIn
    })
  }

  render() {
    const {showSignUp} = this.state
    const {showSignIn} = this.state
    return (
      <Nav>
      <div>
      {this.props.loggedInStatus === "LOGGED_IN"
      ? <Button onClick={() => this.handleLogoutClick()}>Logout</Button>
      : ""
      }
      <Button onClick={this.toggleSignUp}>New Account</Button> &nbsp;
      <Button onClick={this.toggleSignIn}>Sign in</Button> &nbsp;
      </div>

      <div className="Container fluid">
      {showSignUp === true ? <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/> : ""}
      {showSignIn === true ? <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/> : ""}
      </div>
      </Nav>
    )
  }
}
