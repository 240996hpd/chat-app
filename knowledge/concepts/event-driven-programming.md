# Event-Driven Programming

## What is it?
Event-driven programming is a paradigm where the flow of the program is determined by events such as user actions, sensor outputs, or messages from other programs.

## How is it used in this project?
Both the client and server use event listeners to react to actions like sending messages, joining, or disconnecting. Socket.io enables custom events (`join`, `chat message`, etc.) that trigger specific code when received. 