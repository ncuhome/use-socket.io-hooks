# Socket-io Hooks

a single instance socket-io hooks lib for react components

## Why

Since most scene of socket-io are single instance, why not directly provide a react lib based entirely on a single socket instance.

## Installation

```shell
$ npm i use-socket.io-hooks
```

## Example

```tsx
import { Provider, useListener, useEmit } from 'use-socket.io-hooks'

const Main = () => {
  const push = useEmit('ping')

  useListener('ping', (data) => {
    alert(data)
  })

  return <button onClick={() => push('2333')}></button>
}

const App = () => {
  return (
    <Provider url="https://localhost:8081">
      <Main />
    </Provider>
  )
}

export default App
```

## Other Hook

### useConnect

The Connect hook. not need Provider

```tsx
const { connect, disconnect } = useConnect(<url:string>, <opt:string>)
```

### useOnState

The monitored data is automatically converted to state.

```tsx
const { value } = useOnState(<eventName:string>)
```

## Roadmap

- [x] lazy Connect
- [x] add connect hooks params
- [x] state store (get Event linked state)
- [ ] more hooks (use On / Off Any, useEncryptEmit)
- [ ] expose socket context
- [ ] muti nsp (opinion)
- [ ] release 1.0 and OC
