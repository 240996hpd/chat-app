const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users
const users = new Map();

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user joining
    socket.on('join', (username) => {
        users.set(socket.id, username);
        io.emit('user joined', username);
    });

    // Handle chat messages
    socket.on('chat message', (message) => {
        const username = users.get(socket.id);
        io.emit('chat message', { username, message });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username) {
            users.delete(socket.id);
            io.emit('user left', username);
        }
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 