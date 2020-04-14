import React, { Component } from 'react'
import axios from "axios"
import { Card, Button, CardColumns } from 'react-bootstrap'

export default class ShowStates extends Component {
  constructor() {
    super()
    this.state = {
      usstates: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/usstates.json')
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
          
          </Card.Body>
          </Card>
        ))}
        </CardColumns>
        </div>
    )
  }
}
