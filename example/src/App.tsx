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
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            push({
              name: 'sxy',
            });
          }}
        >
          click me for send message
        </button>
      </header>
    </div>
  );
}

export default () => {
  return (
    <Provider
      url="localhost:8081"
      opts={{
        query: {
          count: 0,
        },
      }}
    >
      <App />
    </Provider>
  );
};
