import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    newElement: '',
  }

  handleChange = (event) => {
    this.setState({
      newElement: event.target.value,
    });
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ELEMENTS' });
  }

  handleClick = () => {
    // make a post request
    this.props.dispatch({ type: 'ADD_ELEMENT', payload: this.state });
    this.setState({
      newElement: '',
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}>Button One</button>
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_TWO' })}>Button Two</button>
        <input value={this.state.newElement} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add Element</button>
        <pre>{JSON.stringify(this.props.reduxState)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(App);
