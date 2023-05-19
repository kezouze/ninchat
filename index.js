import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import {Server} from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const app = express();

const server = http.createServer(app);

app.use("/public", express.static(__dirname + '/public'));
app.use("/styles", express.static(__dirname + '/styles'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

const io = new Server(server);

const saveMessage = [];

io.on('connection', (socket) => {
    socket.on('chat message', (pseudo,msg,date) => {
        saveMessage.push({pseudo, msg, date});
        console.log('=====================================');
        console.log(saveMessage);
        io.emit('chat message', pseudo, msg, date);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
