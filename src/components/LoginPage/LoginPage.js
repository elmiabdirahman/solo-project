import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const styles = {
  username: {
    colors: red
  }
}

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <div>
              <TextField
                className={classes.username}
                type="text"
                placeholder="username"
                name="username"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
          </div>
          <div>
              <TextField
                className={classes.password}
                type="password"
                placeholder="password"
                name="password"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
          </div>
          <div>
            <input
              className="log-in"
              type="submit"
              name="submit"
              value="Log In"
            />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
