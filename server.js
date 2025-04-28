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

// Helper function to get all usernames
function getAllUsernames() {
    return Array.from(users.values());
}

// Handle Socket.IO connections
io.on('connection', (socket) => {
    // Handle user joining
    socket.on('join', (username) => {
        users.set(socket.id, username);
        io.emit('user joined', username);
        io.emit('users list', getAllUsernames()); // Send updated user list
        console.log(`A user ${username} connected`);
    });

    // Handle chat messages
    socket.on('chat message', (message) => {
        const username = users.get(socket.id);
        const timestamp = new Date().toLocaleTimeString();
        io.emit('chat message', { username, message, timestamp });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username) {
            users.delete(socket.id);
            io.emit('user left', username);
            io.emit('users list', getAllUsernames()); // Send updated user list
        }
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 