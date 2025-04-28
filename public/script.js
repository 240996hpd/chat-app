// Get DOM elements
const chatMessages = document.getElementById('chat-messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const usernameInput = document.getElementById('username-input');
const joinButton = document.getElementById('join-button');
const chatContainer = document.getElementById('chat-container');
const joinContainer = document.getElementById('join-container');

// Connect to Socket.IO server
const socket = io();

let username = '';

// Handle joining the chat
joinButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        // Hide join form and show chat
        joinContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        
        // Emit join event
        socket.emit('join', username);
    }
});

// Handle sending messages
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        // Emit message to server
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

// Handle receiving messages
socket.on('chat message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span class="username">${data.username}:</span> ${data.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Handle user join notifications
socket.on('user joined', (username) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${username} joined the chat`;
    chatMessages.appendChild(notification);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Handle user leave notifications
socket.on('user left', (username) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `${username} left the chat`;
    chatMessages.appendChild(notification);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}); 