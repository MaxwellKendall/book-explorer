import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  static propTypes = {}

  state = {}

  loginWithFacebook = () => {
    console.log('login with facebook triggered');
  }

  render() {
    return (
      <div className="login">
        <a href="/api">Login with Facebook</a>
      </div>
    );
  }
}
