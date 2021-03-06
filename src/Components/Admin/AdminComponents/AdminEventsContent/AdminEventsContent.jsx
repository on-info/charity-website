import React, { Component } from "react";
import AdminEventsList from "../AdminEventsList/AdminEventsList";
import Button from "../../../Button/Button";
import "./AdminEventsContent.css";
import "../../../../App.css";
import { server } from "../../../../api";
import { Route } from "react-router-dom";
import axios from "axios";

class AdminEventsContent extends Component {
  state = {
    events: []
  };
  componentDidMount() {
    this.getList();
  }
  render() {
    return (
      <React.Fragment>
        <div className="list-container">
          <div className="new-event">
            <div className="button-new-news">
              <Route
                render={({ history }) => (
                  <Button
                    name="button-admin"
                    label="Создать"
                    clickHandler={() => {
                      history.push("/admin-panel/events/create");
                    }}
                  />
                )}
              />
            </div>
            {this.state.events.length > 0 ? (
              <AdminEventsList events={this.state.events} />
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
  getList = () => {
    axios({ url: `${server}/api/events` })
      .then(res => {
        this.setState({ events: res.data.events });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };
  addEvent = () => {
    this.setState({ isOpen: true });
  };
}

export default AdminEventsContent;
