import React, { Component } from "react"
import Registration from "./auth/Registration"
import Login from "./auth/Login"
import axios from "axios"
import { Nav, Navbar, Button, Container } from 'react-bootstrap'

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
    this.props.history.push('/dashboard')
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
      <Container>
      <Navbar bg="primary" variant="dark">
          <Navbar.Brand >ceu<em>Tracker</em></Navbar.Brand>
          <Nav className="justify-content-end">
        <Nav.Item>
          <Button onClick={this.toggleSignUp}>New Account</Button> &nbsp;
        </Nav.Item>
        <Nav.Item>
          <Button onClick={this.toggleSignIn}>Sign in</Button>
        </Nav.Item>
      </Nav>
      </Navbar>
      </Container>

      <Container>
      <div>
      {showSignUp ? <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/> : "" }
      {showSignIn ? <Login handleSuccessfulAuth={this.handleSuccessfulAuth}
      toggleSignIn={this.toggleSignIn}/> : ""}
      </div>
      </Container>
      </div>
    )
  }
}
