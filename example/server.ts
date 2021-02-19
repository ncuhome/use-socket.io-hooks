import { Server, Socket } from 'socket.io';

const io = new Server(8081, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connect', (socket: Socket) => {
  console.log(`connect ${socket.id}`);

  socket.on('ping', (value) => {
    console.log('ping');
    console.log(value);
    socket.emit('ping', 23333);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`);
  });
});
