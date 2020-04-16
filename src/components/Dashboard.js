import React, { Component } from 'react'
import { Nav, Button, Container, Col, Row } from 'react-bootstrap'
import ShowStates from "./ShowStates"
import ShowClient from "./ShowClient"
import ShowCeus from "./ShowCeus"
import axios from "axios"

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      usstates: []
    }
  }

  handleLogoutClick = () => {
    axios.delete('http://localhost:3000/logout', { withCredentials: true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(err => {
      console.log("logout error", err);
    })
  }

  checkLoginStatus() {
    axios.get('http://localhost:3000/logged_in',
      { withCredentials: true })
      .then(response => {
        if (!response.data.logged_in) {
          this.props.history.push('/')
      }
    }).catch(err => {
      console.log("check login error", err);
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }


  render () {
  return (
    <div>
      <Nav>
        <h1>Dashboard</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <Button onClick={() => this.handleLogoutClick()}>Logout</Button>
      </Nav>
      <br/>
      <h1>User Profile</h1>
      <Container>
        <Row>
          <Col>
            <ShowClient />
          </Col>
          <Col>
            <ShowCeus />
          </Col>
        </Row>
      </Container>
      <Container>
      <h1>States Licensed</h1>
      <ShowStates />
      </Container>
    </div>
  )
}
}

// note use `${baseURL}`
