import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Row, Col} from 'react-flexbox-grid';
import ActivityList from './components/ActivityList';

ReactDOM.render(
  <MuiThemeProvider>
    <Row>
      <Col xs={12} sm={6} md={4} lg={2}>
        <ActivityList />
      </Col>
    </Row>
  </MuiThemeProvider>,
  document.getElementById('root')
);
