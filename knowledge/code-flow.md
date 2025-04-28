# Code Flow: Simple Real-Time Chat App

This document explains the step-by-step code flow for the real-time chat app, covering both server and client sides, and how they interact.

---

## Table of Contents

1. [User Opens the App (Client Side)](#1-user-opens-the-app-client-side)
2. [User Joins the Chat](#2-user-joins-the-chat)
3. [Server Handles User Join](#3-server-handles-user-join)
4. [Displaying Online Users (Client Side)](#4-displaying-online-users-client-side)
5. [Sending a Message](#5-sending-a-message)
6. [Server Handles Message](#6-server-handles-message)
7. [Displaying Messages (Client Side)](#7-displaying-messages-client-side)
8. [User Leaves the Chat](#8-user-leaves-the-chat)
9. [Summary Table](#summary-table)
10. [Key Files and Their Roles](#key-files-and-their-roles)

---

## 1. User Opens the App (Client Side)

- The user visits [http://localhost:3000](http://localhost:3000).
- [`index.html`](../public/index.html) loads, displaying a form to enter a username.  
  **Technologies:** [HTML](technologies/html.md), [CSS](technologies/css.md)  
  **Concepts:** [Separation of Concerns](concepts/separation-of-concerns.md)
- [`script.js`](../public/script.js) is loaded and sets up [event listeners](concepts/event-driven-programming.md) for joining and messaging.  
  **Technologies:** [JavaScript](technologies/javascript.md)  
  **Concepts:** [DOM Manipulation](concepts/dom-manipulation.md), [Event-Driven Programming](concepts/event-driven-programming.md)

---

## 2. User Joins the Chat

- The user enters a username and submits the join form.
- [`script.js`](../public/script.js):
  - Hides the join form and shows the chat UI.
  - Emits a [`join`](concepts/event-driven-programming.md) event to the server with the username using [Socket.io](technologies/socketio.md).  
  **Technologies:** [JavaScript](technologies/javascript.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [Event-Driven Programming](concepts/event-driven-programming.md), [Real-Time Communication](concepts/real-time-communication.md)

---

## 3. Server Handles User Join

- In [`server.js`](../server.js), the server receives the `join` event:
  - Adds the user to the [`users` map](concepts/data-structures.md) (keyed by socket ID).
  - Broadcasts a `user joined` event to all clients with the username.
  - Broadcasts the updated list of online users via the `users list` event.
  - Logs the connection with the username.
  **Technologies:** [Node.js](technologies/nodejs.md), [Express](technologies/express.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [Event-Driven Programming](concepts/event-driven-programming.md), [Broadcasting](concepts/broadcasting.md), [Data Structures](concepts/data-structures.md), [Asynchronous Programming](concepts/asynchronous-programming.md)

---

## 4. Displaying Online Users (Client Side)

- All clients listen for the `users list` event.
- When received, [`script.js`](../public/script.js) updates the sidebar to show all currently online usernames.
  **Technologies:** [JavaScript](technologies/javascript.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [DOM Manipulation](concepts/dom-manipulation.md), [Event-Driven Programming](concepts/event-driven-programming.md), [Real-Time Communication](concepts/real-time-communication.md)

---

## 5. Sending a Message

- The user types a message and submits the message form.
- [`script.js`](../public/script.js) emits a `chat message` event to the server with the message text.
  **Technologies:** [JavaScript](technologies/javascript.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [Event-Driven Programming](concepts/event-driven-programming.md), [Real-Time Communication](concepts/real-time-communication.md)

---

## 6. Server Handles Message

- The server receives the `chat message` event:
  - Looks up the sender's username.
  - Adds a timestamp.
  - Broadcasts a `chat message` event to all clients with `{ username, message, timestamp }`.
  **Technologies:** [Node.js](technologies/nodejs.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [Event-Driven Programming](concepts/event-driven-programming.md), [Broadcasting](concepts/broadcasting.md), [Asynchronous Programming](concepts/asynchronous-programming.md)

---

## 7. Displaying Messages (Client Side)

- All clients listen for the `chat message` event.
- When received, [`script.js`](../public/script.js) displays the message in the chat area, showing the username and timestamp.
  **Technologies:** [JavaScript](technologies/javascript.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [DOM Manipulation](concepts/dom-manipulation.md), [Event-Driven Programming](concepts/event-driven-programming.md)

---

## 8. User Leaves the Chat

- When a user closes their tab or disconnects:
  - The server removes them from the `users` map.
  - Broadcasts a `user left` event and the updated `users list` to all clients.
  - Clients update the sidebar and show a notification in the chat area.
  **Technologies:** [Node.js](technologies/nodejs.md), [Socket.io](technologies/socketio.md), [JavaScript](technologies/javascript.md)  
  **Concepts:** [Event-Driven Programming](concepts/event-driven-programming.md), [Broadcasting](concepts/broadcasting.md), [Data Structures](concepts/data-structures.md)

---

## Summary Table

| Event                | Triggered By | Server Action                                 | Client Action                                 | Technologies | Concepts |
|----------------------|--------------|-----------------------------------------------|-----------------------------------------------|--------------|----------|
| `join`               | Client       | Add user, broadcast `user joined` & `users list` | Show chat UI, update sidebar, show notification | [Socket.io](technologies/socketio.md), [JavaScript](technologies/javascript.md) | [Event-Driven Programming](concepts/event-driven-programming.md), [Broadcasting](concepts/broadcasting.md) |
| `chat message`       | Client       | Broadcast message with username & timestamp   | Display message in chat area                  | [Socket.io](technologies/socketio.md), [JavaScript](technologies/javascript.md) | [Event-Driven Programming](concepts/event-driven-programming.md), [Broadcasting](concepts/broadcasting.md) |
| `disconnect`         | Socket close | Remove user, broadcast `user left` & `users list` | Update sidebar, show notification             | [Socket.io](technologies/socketio.md), [JavaScript](technologies/javascript.md) | [Event-Driven Programming](concepts/event-driven-programming.md), [Broadcasting](concepts/broadcasting.md) |
| `users list`         | Server       | (on join/leave) Send all usernames           | Update sidebar                                | [Socket.io](technologies/socketio.md), [JavaScript](technologies/javascript.md) | [Event-Driven Programming](concepts/event-driven-programming.md) |

---

## Key Files and Their Roles

- **[server.js](../server.js)**: Handles all real-time logic, user management, and message broadcasting.  
  **Technologies:** [Node.js](technologies/nodejs.md), [Express](technologies/express.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [Event-Driven Programming](concepts/event-driven-programming.md), [Broadcasting](concepts/broadcasting.md)
- **[public/index.html](../public/index.html)**: The main UI structure.  
  **Technologies:** [HTML](technologies/html.md)
- **[public/script.js](../public/script.js)**: Handles all client-side logic, event listening, and DOM updates.  
  **Technologies:** [JavaScript](technologies/javascript.md), [Socket.io](technologies/socketio.md)  
  **Concepts:** [DOM Manipulation](concepts/dom-manipulation.md), [Event-Driven Programming](concepts/event-driven-programming.md)
- **[public/style.css](../public/style.css)**: Styles the chat UI and sidebar.  
  **Technologies:** [CSS](technologies/css.md)

---
