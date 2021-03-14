const http = require('http');
const fs = require('fs');
const url = require('url');

const socketServer = require('./socket-server');

const requestListener = (req, res) => {
	const { pathname } = url.parse(req.url);

	if (pathname === '/wakemydyno.txt') {
		return fs.readFile(`${__dirname}/wakemydyno.txt`, (_, data) => {
			res.writeHead(200);
			res.end(data);
		});
	}

	res.writeHead(200);
	res.end();
};
const httpServer = http.createServer(requestListener);

socketServer(httpServer);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on 127.0.0.1:${PORT}`));
