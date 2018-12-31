import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Orders from "./components/orders/orders.js";
import ViewOrder from "./components/orders/view_order.js";
import { Header, Segment, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Segment>
            <Header as='h3'>
              {" "}
              <Link to="/orders"> Orders </Link>{" "}
            
              {" "} ||
              <Link to="/view_order"> View single order </Link>{" "}
            </Header>
          </Segment>
          <Route exact path="/orders" component={Orders} />
          <Route path="/view_order" component={ViewOrder} />
        </div>
      </Router>
    );
  }
}

export default App;
