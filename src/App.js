import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router >
          <Routes />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);