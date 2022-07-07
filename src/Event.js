import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class Event extends Component {

  state = {
    visible: false
  }

  handleButtonClick = (prevState) => {
    this.setState({
      visible: !prevState.visible
    })
  }

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <Card>
          <Card.Header className="summary">
            {event.summary}
            <Button className="button button-details" onClick={() => this.handleButtonClick(this.state)}>
              {this.state.visible ? 'Hide Details' : 'Show Details'}
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title className="dateTime">
              {event.dateTime}
            </Card.Title>
            <Card.Text className="location">
              {event.location}
            </Card.Text>
            {this.state.visible ? (
              <Card.Text className="description">
                {event.description}
              </Card.Text>) : null}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Event;