import React from 'react'
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
 * - fn 监听器出发的回调函数
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
}

/**
 * 提供连接函数
 */
export const useConnect = () => {
  const { socketInstance, setSocketInstance, url, opts } = useSocketStore(
    (state) => ({
      socketInstance: state.socket,
      url: state.url,
      opts: state.opts,
      setSocketInstance: state.setSocket,
    })
  )

  const connect = () => {
    if (!url) return

    if (socketInstance) {
      console.log('已建立连接，无需重复连接')
      return
    }

    console.log('建立连接中...')
    const socket = io(url, opts)
    setSocketInstance(socket)
  }

  const disconnect = () => {
    if (!socketInstance) {
      console.log('未建立连接')
      return
    }

    console.log('断开连接中...')
    socketInstance.disconnect()
  }

  return {
    connect,
    disconnect,
  }
}
