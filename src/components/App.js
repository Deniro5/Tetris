import React, { Component } from 'react';
import Home from './Home'
import '../scss/app.scss';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Home/>
      </div>

    );
  }
}

export default App;
