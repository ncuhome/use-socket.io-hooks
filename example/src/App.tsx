import React from 'react';
import logo from './logo.svg';
import { useListener, useEmit } from 'use-socket.io-client';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  const push = useEmit('ping');

  useListener('ping', (data) => {
    alert(data);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <p>
          Page has been open for <code>{count}</code> seconds.
        </p> */}
        <div onClick={() => push('nm')}>send message</div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
