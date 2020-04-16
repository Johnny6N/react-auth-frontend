import React, { Component } from 'react'
import axios from "axios"
import { Card, CardGroup, Button, CardColumns, DropdownButton, Dropdown } from 'react-bootstrap'

export default class ShowClient extends Component {
  constructor() {
    super()
    this.state = {
      clients: []
    }
  }

  handleDelete = async (id) => {
        axios.delete(`http://localhost:3000/clients/${id}.json`)
        .then(response => response.data)
          .catch((error) => {
            throw error.response.data
        })
    }

  componentDidMount() {
    axios.get('http://localhost:3000/clients.json')
    .then(res => {
      console.log(res);
      this.setState({ clients: res.data })
    })
  }

  render() {
    return (
        <div>
        {this.state.clients.map(client =>(
          <Card key={client.id} bg="primary" text="white" style={{ width: '18rem' }}>
          <Card.Body>
          <Card.Title>{client.f_name} {client.l_name}</Card.Title>

          <Card.Text>
          {client.license}
          </Card.Text>

            <DropdownButton id="dropdown-basic-button" title="Admin button">
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item onClick={this.handleDelete}>Delete</Dropdown.Item>
            </DropdownButton>
          </Card.Body>
          </Card>
        ))}
        </div>
    )
  }
}
