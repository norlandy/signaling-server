const socketIo = require('socket.io');

module.exports = httpServer => {
	const io = socketIo(httpServer, {
		cors: {
			origin: '*',
		},
	});

	const clients = {};

	io.on('connection', client => {
		const { clientId, roomId } = client.handshake.query;

		// create a room if there is none
		if (!clients[roomId]) {
			clients[roomId] = [];
		}

		if (clients[roomId].length === 4) {
			client.emit('cant-join');
		} else {
			client.emit('can-join');

			clients[roomId].push(clientId);

			client.join(roomId);
		}

		client.on('user-disconnected', data => {
			clients[roomId] = clients[roomId].filter(clientId => clientId !== data.clientId);

			// delete a room if there is empty
			if (!clients[roomId].length) {
				delete clients[roomId];
			}

			client.broadcast.to(roomId).emit('user-disconnected', data.clientId);
		});

		client.on('user-connected', data => {
			client.broadcast.to(roomId).emit('user-connected', data.clientId);
		});

		client.on('call', call => {
			client.broadcast.to(roomId).emit('incoming-call', call);
		});

		client.on('answer', answer => {
			client.broadcast.to(roomId).emit('answer', answer);
		});

		client.on('new-ice-candidate', data => {
			client.broadcast.to(roomId).emit('new-ice-candidate', data);
		});
	});
};
