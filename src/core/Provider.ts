import React, { useEffect, createElement, Fragment } from 'react'
import { useConnect } from './hooks'
import { useSocketStore } from './store'

interface Props {
  url: string
  opts?: any
  lazy?: boolean
}

/**
 * 自动初始化 socket
 *
 * - 不使用 Provider 也可以初始化 socket 连接
 * - 支持 socket 连接动态加载
 */
export const Provider: React.FC<Props> = ({
  url,
  opts,
  lazy = false,
  children,
}) => {
  const { socketInstance, setMultiValue, socketURL, socketOpts } =
    useSocketStore((state) => ({
      socketInstance: state.socket,
      socketURL: state.url,
      socketOpts: state.opts,
      setMultiValue: state.setMultiValue,
    }))
  const { connect, disconnect } = useConnect()

  useEffect(() => {
    setMultiValue({ url, opts })
  }, [url, opts])

  useEffect(() => {
    if (lazy) return

    connect()

    return () => {
      disconnect()
    }
  }, [socketURL, socketOpts, lazy])

  useEffect(() => {
    if (!socketInstance) return

    socketInstance.on('connect', () => {
      setMultiValue({ isConnect: true })
      console.log('已成功建立 websocket 连接')
    })
    socketInstance.on('disconnect', () => {
      setMultiValue({ isConnect: false })
      console.log('已断开连接')
    })

    return () => {
      socketInstance.off('connect', () => {})
      socketInstance.off('disconnect', () => {})
    }
  }, [socketInstance])

  return createElement(Fragment, {}, children)
}
