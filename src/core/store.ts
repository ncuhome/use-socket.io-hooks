import create from 'zustand'
import { combine } from 'zustand/middleware'
import type { Socket } from 'socket.io-client'
import produce from 'immer'

type SocketIO = typeof Socket | null

interface SocketData {
  [key: string]: any
  socket: SocketIO
  sockets: SocketIO[]
  url: string
  opts: any
  data: Record<string, any>
}

export const useSocketStore = create(
  combine(
    {
      socket: null as SocketIO,
      sockets: [] as SocketIO[],
      url: null,
      opts: null,
      data: {},
    } as SocketData,
    (set) => ({
      setSocket: (socket: SocketIO) => {
        set(
          produce((state) => {
            state.socket = socket
            return state
          })
        )
      },
      addSocketToList: (socket: SocketIO) => {
        set(
          produce((state) => {
            state.sockets.push(socket)
            return state
          })
        )
      },
      setData: (key: string, value: any) => {
        set(
          produce((state) => {
            state.data[key] = value
            return state
          })
        )
      },
      setMultiValue: (data: Partial<SocketData>) => {
        set(
          produce((state) => {
            Object.keys(data).forEach((i) => {
              if (state[i] !== undefined) {
                state[i] = data[i]
              }
            })

            return state
          })
        )
      },
    })
  )
)
