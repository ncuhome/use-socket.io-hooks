import React, { useEffect } from 'react'
import { useSocketStore } from './store'
import io from 'socket.io-client'

/**
 * 返回可发送事件的函数
 * - event 事件名
 */
export const useEmit = <T extends string, K extends Record<T, any>>(
  event: T
) => {
  const socket = useSocketStore((state) => state.socket)
  const send = React.useCallback(
    (data: K[T]) => {
      if (!socket) return

      socket.emit(event, JSON.stringify(data))
    },
    [socket]
  )

  return send
}

/**
 * 添加监听器
 * - event 事件名
 * - fn 监听器触发的回调函数
 */
export const useListener = <T extends string, K extends Record<T, any>>(
  event: T,
  fn: (data: K[T]) => void
) => {
  const socket = useSocketStore((state) => state.socket)

  React.useEffect(() => {
    if (!socket) return

    socket.on(event, (data: K[T]) => {
      fn(data)
      console.log(data)
    })
    return () => {
      socket.off(event)
    }
  }, [socket])

  return () => socket.off(event)
}

/**
 * 提供连接函数
 */
export const useConnect = (newUrl?: string, newOpts?: any) => {
  const { socketInstance, setSocketInstance, url, opts, setMultiValue } =
    useSocketStore((state) => ({
      socketInstance: state.socket,
      url: state.url,
      opts: state.opts,
      setSocketInstance: state.setSocket,
      setMultiValue: state.setMultiValue,
    }))

  const connect = () => {
    let _url = url,
      _opts = opts

    if (newUrl) {
      _url = newUrl
      setMultiValue({ url: _url })
    }

    if (!_url) return

    if (newOpts) {
      _opts = newOpts
      setMultiValue({ opts: _opts })
    }

    if (socketInstance) {
      console.log('已建立连接，无需重复连接')
      return
    }

    console.log('建立连接中...')
    const socket = io(_url, { ..._opts })
    setSocketInstance(socket)
  }

  const disconnect = () => {
    if (!socketInstance) {
      console.log('未建立连接')
      return
    }

    console.log('断开连接中...')
    socketInstance.disconnect()
    setMultiValue({ socket: null, isConnect: false })
  }

  return {
    connect,
    disconnect,
  }
}

/**
 * 添加监听器，并将监听的数据转为 state
 * - event 事件名
 * - initialState 初始值
 *
 * return state
 */
export const useOnState = <T extends string, K extends Record<T, any>>(
  event: T,
  initialState: K
) => {
  const { socket, setData, data } = useSocketStore((state) => ({
    socket: state.socket,
    setData: state.setData,
    data: state.data,
  }))

  React.useEffect(() => {
    if (!socket) return

    setData(event, initialState)

    socket.on(event, (data: K[T]) => {
      setData(event, data)
      console.log(data)
    })
    return () => {
      socket.off(event)
    }
  }, [socket])

  return {
    value: data[event],
  }
}

/**
 * 返回断开函数
 */
export const useDisconnect = () => {
  const [socket, setMultiValue] = useSocketStore((state) => [
    state.socket,
    state.setMultiValue,
  ])

  const disconnect = () => {
    if (!socket) {
      console.log('未建立连接')
      return
    }

    console.log('断开连接中...')
    socket.disconnect()
    setMultiValue({ socket: null, isConnect: false })
  }

  return disconnect
}

/**
 * socket 加载后执行
 */
export const useMounted = (fn: React.EffectCallback) => {
  const [socket] = useSocketStore((state) => [state.socket])

  useEffect(fn, [socket])
}
