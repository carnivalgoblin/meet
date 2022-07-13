import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    warningText: '',
    numberOfEvents: 32
  }


  handleInputChanged = (event) => {
    const value = event.target.value;
    if ((value > 32) || (value < 1)) {
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
        <label htmlFor="number-input">Number of events:</label><br />
        <input
          type="text"
          id="number-input"
          className="number-of-events"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
        <ErrorAlert text={this.state.warningText} />
      </div>
    )
  }
}

export default NumberOfEvents;