import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

    const eventDate = event.start.dateTime;
    let splitDate = eventDate.split(/[-T]+/);
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];
    let exactTime = splitDate[3].split(/:/);
    let hour = exactTime[0];
    let minutes = exactTime[1]
    let date = new Date(Date.UTC(year, month, day, hour, minutes));
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let dateOutput = date.toLocaleDateString(undefined, options)

    return (
      <div className="event">
        <Card>
          <Card.Header className="summary">
            {event.summary}
          </Card.Header>
          <Card.Body>
            <Card.Title className="dateTime">
              {dateOutput}
            </Card.Title>
            <Card.Text className="location">
              {event.location}
            </Card.Text>
            <Button variant="outline-primary" className="button button-details details-btn" onClick={() => this.handleButtonClick(this.state)}>
              {this.state.visible ? 'Hide Details' : 'Show Details'}
            </Button>
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