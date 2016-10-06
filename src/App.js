import '../node_modules/bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Examples from './Examples';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Reform Examples</h1>
            <p>
              In this page we are going to show a few examples of Reform
              in their different variations
            </p>
          </Col>
        </Row>

        <Examples />,
      </Grid>
    );
  }
}
