const http = require('http');
const path = require('path');
const express = require('express');

const socketServer = require('./socket-server');

// const requestListener = (req, res) => {
// 	const { pathname } = url.parse(req.url);

// 	if (pathname === '/wakemydyno.txt') {
// 		return fs.readFile(path.join(__dirname, 'wakemydyno.txt'), (_, data) => {
// 			res.writeHead(200);
// 			res.end(data);
// 		});
// 	}

// 	res.writeHead(200);
// 	res.end();
// };

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = http.createServer(app);

socketServer(httpServer);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on 127.0.0.1:${PORT}`));
