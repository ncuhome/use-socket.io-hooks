import { useState } from 'react';
import { useListener, useEmit } from 'use-socket.io-hooks';
import { Provider } from 'use-socket.io-hooks';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  const push = useEmit('ping');

  useListener('ping', (data) => {
    alert(data);
  });

  return (
    <button
      onClick={() => {
        push({
          name: 'sxy',
        });
      }}
    >
      click me for send message
    </button>
  );
}

export default () => {
  const [count, setCount] = useState(0);
  return (
    <Provider
      url="localhost:8081"
      opts={{
        query: {
          count,
        },
        transports: ['websocket'],
      }}
    >
      <App />
      <button onClick={() => setCount((e) => e + 1)}>+1: {count}</button>
    </Provider>
  );
};
