import { stateFactory } from '../utils/state_factory'
import type { Socket } from 'socket.io-client'

type SocketIO = typeof Socket | null

interface SocketData {
  [key: string]: any
  socket: SocketIO
  sockets: SocketIO[]
  url: string
  opts: any
  isConnect: boolean
  data: Record<string, any>
}

export const useSocketStore = stateFactory(
  {
    socket: null as SocketIO,
    sockets: [] as SocketIO[],
    url: null,
    opts: null,
    isConnect: false,
    data: {},
  } as SocketData,
  (set) => ({
    setSocket: (socket: SocketIO) => {
      set((state) => {
        state.socket = socket
        return state
      })
    },
    addSocketToList: (socket: SocketIO) => {
      set((state) => {
        state.sockets.push(socket)
        return state
      })
    },
    setData: (key: string, value: any) => {
      set((state) => {
        state.data[key] = value
        return state
      })
    },
    setMutiValue: (data: Partial<SocketData>) => {
      set((state) => {
        Object.keys(data).forEach((i) => {
          if (state[i] !== undefined) {
            state[i] = data[i]
          }
        })

        return state
      })
    },
  })
)
