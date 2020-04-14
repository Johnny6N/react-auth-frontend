import React, { Component } from 'react'
import axios from "axios"
import { Card, Button, CardColumns, DropdownButton, Dropdown } from 'react-bootstrap'

export default class ShowStates extends Component {
  constructor() {
    super()
    this.state = {
      usstates: []
    }
  }

  handleDelete = async (id) => {
        axios.delete(`https://git.heroku.com/ceutracker-react-frontend.git/usstates/${id}.json`)
        .then(response => response.data)
          .catch((error) => {
            throw error.response.data
        })
    }

  componentDidMount() {
    axios.get('https://git.heroku.com/ceutracker-react-frontend.git/usstates.json')
    .then(res => {
      console.log(res);
      this.setState({ usstates: res.data })
    })
  }

  render() {
    return (
        <div>
        <CardColumns>
        {this.state.usstates.map(usstate =>(
          <Card bg="primary" text="white" style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title>{usstate.name}</Card.Title>
          <Card.Subtitle>Hours needed:{usstate.hours}, {usstate.periodicity}</Card.Subtitle>
          <Card.Text>
          {usstate.conditions}
          </Card.Text>
          <Card.Link href={usstate.link}>State Link</Card.Link>
            <DropdownButton id="dropdown-basic-button" title="Admin button">
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDelete}>Delete</Dropdown.Item>
            </DropdownButton>
          </Card.Body>
          </Card>
        ))}
        </CardColumns>
        </div>
    )
  }
}
