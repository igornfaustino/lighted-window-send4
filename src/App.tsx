import React from 'react';
import { hot } from 'react-hot-loader';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1> Hello, Typescript with tests </h1>
    </div>
  );
};

export default hot(module)(App);
