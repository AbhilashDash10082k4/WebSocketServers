"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_1 = require("ws");
const port = 8080;
//natively write http server without the express lib, establishing a handshake
// const server = createServer(function(req, res) {
//     console.log((new Date()) + 'Recieved req for ' + req.url);
//     res.end(' hi ');
// });
const server = (0, http_1.createServer)(function (req, res) {
    console.log("Connected" + (new Date()) + `Request from url ${req.url}`);
    res.end("Hi from server! ");
});
//upgrading the http server to websocket server
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', function connection(socket) {
    //each socket.on is an event
    socket.on('error', (err) => console.error(err));
    //isBinary converts object:blob into the actual message that was sent from a client
    socket.on('message', function message(data, isBinary) {
        console.log(data);
        //broadcasting the connection to every client whose connection is open (client.readyState == WebSocket.OPEN)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    socket.send('Hi from server');
});
server.listen(port, () => {
    console.log((new Date()) + ` Server is listening on http://localhost:${port}`);
});
