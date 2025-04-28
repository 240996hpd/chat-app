# Code Flow: Simple Real-Time Chat App

This document explains the step-by-step code flow for the real-time chat app, covering both server and client sides, and how they interact.

---

## 1. User Opens the App (Client Side)

- The user visits [http://localhost:3000](http://localhost:3000).
- `index.html` loads, displaying a form to enter a username.
- `script.js` is loaded and sets up event listeners for joining and messaging.

---

## 2. User Joins the Chat

- The user enters a username and submits the join form.
- `script.js`:
  - Hides the join form and shows the chat UI.
  - Emits a `join` event to the server with the username.

---

## 3. Server Handles User Join

- In `server.js`, the server receives the `join` event:
  - Adds the user to the `users` map (keyed by socket ID).
  - Broadcasts a `user joined` event to all clients with the username.
  - Broadcasts the updated list of online users via the `users list` event.
  - Logs the connection with the username.

---

## 4. Displaying Online Users (Client Side)

- All clients listen for the `users list` event.
- When received, `script.js` updates the sidebar to show all currently online usernames.

---

## 5. Sending a Message

- The user types a message and submits the message form.
- `script.js` emits a `chat message` event to the server with the message text.

---

## 6. Server Handles Message

- The server receives the `chat message` event:
  - Looks up the sender's username.
  - Adds a timestamp.
  - Broadcasts a `chat message` event to all clients with `{ username, message, timestamp }`.

---

## 7. Displaying Messages (Client Side)

- All clients listen for the `chat message` event.
- When received, `script.js` displays the message in the chat area, showing the username and timestamp.

---

## 8. User Leaves the Chat

- When a user closes their tab or disconnects:
  - The server removes them from the `users` map.
  - Broadcasts a `user left` event and the updated `users list` to all clients.
  - Clients update the sidebar and show a notification in the chat area.

---

## Summary Table

| Event                | Triggered By | Server Action                                 | Client Action                                 |
|----------------------|--------------|-----------------------------------------------|-----------------------------------------------|
| `join`               | Client       | Add user, broadcast `user joined` & `users list` | Show chat UI, update sidebar, show notification |
| `chat message`       | Client       | Broadcast message with username & timestamp   | Display message in chat area                  |
| `disconnect`         | Socket close | Remove user, broadcast `user left` & `users list` | Update sidebar, show notification             |
| `users list`         | Server       | (on join/leave) Send all usernames           | Update sidebar                                |

---

## Key Files and Their Roles

- **server.js**: Handles all real-time logic, user management, and message broadcasting.
- **public/index.html**: The main UI structure.
- **public/script.js**: Handles all client-side logic, event listening, and DOM updates.
- **public/style.css**: Styles the chat UI and sidebar.

---
