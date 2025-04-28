// Get DOM elements using correct IDs from index.html
const usernameInput = document.getElementById('username');
const joinForm = document.getElementById('join-form');
const joinContainer = document.getElementById('join-container');
const chatContainer = document.getElementById('chat-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');

// Connect to Socket.IO server
const socket = io();
let username = '';

// Handle joining the chat
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    username = usernameInput.value.trim();
    if (username) {
        joinContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        socket.emit('join', username);
    }
});

// Handle sending messages
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

// Handle receiving messages
socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span class="username">${data.username}:</span> ${data.message}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
});

// Handle user join notifications
socket.on('user joined', (username) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${username} joined the chat`;
    messages.appendChild(notification);
    messages.scrollTop = messages.scrollHeight;
});

// Handle user leave notifications
socket.on('user left', (username) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${username} left the chat`;
    messages.appendChild(notification);
    messages.scrollTop = messages.scrollHeight;
}); 