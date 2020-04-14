import React, { Component } from "react"
import Registration from "./auth/Registration"
import Login from "./auth/Login"
import axios from "axios"
import { Nav, Button, Container } from 'react-bootstrap'
import ShowStates from "./ShowStates.js"

export default class Home extends Component {
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
      <div>
      <Nav>
      <div>
      {this.props.loggedInStatus === "LOGGED_IN"
      ? <Button onClick={() => this.handleLogoutClick()}>Logout</Button>
      : <Button onClick={this.toggleSignUp}>New Account</Button>} &nbsp;
      {this.props.loggedInStatus === "LOGGED_IN"
      ? ""
      : <Button onClick={this.toggleSignIn}>Sign in</Button>} &nbsp;

      </div>

      <div>
      {showSignUp === true ? <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/> : ""}
      {showSignIn === true ? <Login handleSuccessfulAuth={this.handleSuccessfulAuth}
      toggleSignIn={this.toggleSignIn}/> : ""}
      </div>
      </Nav>

      <ShowStates />
      </div>
    )
  }
}
