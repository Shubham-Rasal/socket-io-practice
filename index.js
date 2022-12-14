const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {

    console.log('get req received.');
    res.sendFile(__dirname + '/index.html');

})

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('chat', 'user connected');
    socket.on('chat message', (msg)=>{
        console.log(msg)
        io.emit('chat', msg);
    })
    socket.on('disconnect',()=>{
          io.emit('chat', 'user disconnected.');
    })
});




server.listen(PORT, () => {
    console.log(`listening on port ${PORT}  ...`);
})


