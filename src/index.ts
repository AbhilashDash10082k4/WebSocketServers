import { createServer } from 'https';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';

//natively write http server without the express lib, establishing a handshake
const server = createServer(function(req, res) {
    console.log((new Date()) + 'Recieved req for ' + req.url);
    res.end(' hi ');
});
 
//upgrading the http server to websocket server
const wss = new WebSocketServer({server})
wss.on('connection', function connection(socket) {
    socket.on('error', (err) => console.error(err));
    socket.on('connection', function message(data) {
        console.log(data);
        wss.clients.forEach(function each(client) {
            if(client.readyState == WebSocket.OPEN) {
                client.send(data);
            }
        })
    })
    socket.send('Hi from server')
})

server.listen(8080);