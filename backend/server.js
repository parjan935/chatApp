const express = require('express');
const { Server } = require('socket.io');
const db = require('./configurations/db');
const cors = require('cors');
const app = express();

const http = require('http'); 
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

const userRoutes =require('./routes/userRoutes')


app.use('/user',userRoutes)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
    },
});

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('message_send', ({message}) => {
        socket.broadcast.emit('message_received', message);
    });
});


server.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
