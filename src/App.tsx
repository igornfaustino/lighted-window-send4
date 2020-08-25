import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './App.module.scss';
import Window from './components/Window';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1> Hello, Typescript with tests and docker </h1>
      <Window />
    </div>
  );
};

export default hot(module)(App);
