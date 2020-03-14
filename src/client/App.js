import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import './app.css';

export default class App extends Component {
  state = { numDays: null };

  componentDidMount() {
    this.interval = setInterval(
      () => fetch('/api/getNumDays')
        .then(res => res.json())
        .then(user => this.setState({ numDays: user.numDays })),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { numDays } = this.state;
    return (
      <div className="App">
        <Container>
          <div className="AppBody">
            <p className="display-4">
              How many days until we should return to campus?
            </p>
            <h1 className="text-center display-1 py-5">
              {numDays}
              {' '}
              days
            </h1>
            <p>
              Type in Twitch chat to make your voice heard.
              <br />
              <br />
              <code>!tomorrow</code>
              {' '}
              to increase
              <br />
              <code>!yesterday</code>
              {' '}
              to decrease
              <br />
              <br />
            </p>
          </div>
        </Container>
        <div className="bg-light pt-4 footer mt-auto">
          <Container>
            <p className="footer">
              Visit cmu.edu/alerts/coronavirus for more information regarding
              the university's response to COVID-19
            </p>
          </Container>
        </div>
      </div>
    );
  }
}
