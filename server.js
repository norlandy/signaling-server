const http = require('http');
const path = require('path');
const express = require('express');

const socketServer = require('./socket-server');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = http.createServer(app);

socketServer(httpServer);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on 127.0.0.1:${PORT}`));
