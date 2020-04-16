import React, { Component } from 'react'
import axios from "axios"
import { Card, Button, CardColumns, DropdownButton, Dropdown } from 'react-bootstrap'

export default class ShowCeus extends Component {
  constructor() {
    super()
    this.state = {
      ceus: []
    }
  }

  handleDelete = async (id) => {
        axios.delete(`http://localhost:3000/ceus/${id}.json`)
        .then(response => response.data)
          .catch((error) => {
            throw error.response.data
        })
    }

  componentDidMount() {
    axios.get('http://localhost:3000/ceus.json')
    .then(res => {
      console.log(res);
      this.setState({ ceus: res.data })
    })
  }

  render() {
    return (
        <div>
        <CardColumns>
        {this.state.ceus.map(ceu =>(
          <Card key={ceu.id} bg="primary" text="white" style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title>{ceu.title}</Card.Title>
          <Card.Subtitle>Course number:{ceu.number}</Card.Subtitle>
          <Card.Text>Hours: {ceu.hours}<br/>
          State: {ceu.state}<br/>
          Hours: {ceu.instructor_name}<br/>
          Hours: {ceu.provider_name}<br/>
          </Card.Text>
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
