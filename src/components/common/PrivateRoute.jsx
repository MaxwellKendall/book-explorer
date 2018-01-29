import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export default class PrivateRoute extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    activeUser: PropTypes.object,
    setActiveUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    activeUser: null,
  }

  render() {
    return (
      <Route
        exact
        path={this.props.path}
        /* eslint-disable no-unused-expressions */
        render={() => (
          this.props.activeUser === null
            ? <Redirect to="/login" />
            : <this.props.component />
        )}
      />
    );
  }
}
