const httpServer = require('http').createServer();

const socketServer = require('./socket-server');

socketServer(httpServer);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on 127.0.0.1:${PORT}`));
