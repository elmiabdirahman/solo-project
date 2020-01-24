import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from '../HomePage/HomePage';

class UserPage extends Component {
  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);