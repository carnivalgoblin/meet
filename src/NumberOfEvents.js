import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class NumberOfEvents extends Component {
  state = {
    warningText: '',
    numberOfEvents: 32
  }


  handleInputChanged = (event) => {
    const value = event.target.value;
    if ((value > 33) || (value < 1)) {
      this.setState({
        warningText: 'Please choose a number between 1 and 32'
      });
    } else {
      this.setState({
        warningText: '',
        numberOfEvents: value
      });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="number-of-events"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
        <Alert variant="warning">
          {this.state.warningText}
        </Alert>
      </div>
    )
  }
}

export default NumberOfEvents;