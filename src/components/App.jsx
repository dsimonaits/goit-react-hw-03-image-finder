import React, { Component } from 'react';
import Section from './Section';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <Section title="Phonebook" border="false"></Section>
      </>
    );
  }
}

export default App;
