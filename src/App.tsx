import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1> Hello, Typescript with tests and docker </h1>
    </div>
  );
};

export default hot(module)(App);
