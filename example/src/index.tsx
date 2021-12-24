import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'use-socket.io-hooks';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider
      url="localhost:8081"
      opts={{
        query: 'sxy',
      }}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
