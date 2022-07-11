import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className="EventList grid">
        {events.map(event =>
          <li key={event.id} className="event-item grid__item">
            <Event event={event} />
          </li>
        )}
      </ul>
    );
  }
}

export default EventList;