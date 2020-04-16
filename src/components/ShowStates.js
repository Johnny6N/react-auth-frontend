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

  fetchStates = async () => {
      let response = axios.get('http://localhost:3000/usstates.json')
      .then(res => {
        console.log(res);
        this.setState({ usstates: res.data })
      })
    }


  handleDelete = async (id) => {
    let response = await axios.delete(`http://localhost:3000/usstates/${id}`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
  }

  handleUpdate = async updateState => {
        let response = await axios.put(`http://localhost:3000/usstates/${updateState.id}`, {
          body: JSON.stringify(updateState),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        })
        let data = await response.json()
        this.fetchStates()
      }

  componentDidMount() {
    this.fetchStates()
  }

  render() {
    return (
        <div>
        <CardColumns>
        {this.state.usstates.map(usstate =>(

          <Card key={usstate.id} bg="primary" text="white" style={{ width: '18rem' }}>
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
