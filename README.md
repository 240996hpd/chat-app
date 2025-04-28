# Simple Real-time Chat Application

A simple real-time chat application built with Node.js, Express, and Socket.IO.

## Features

- Real-time messaging
- Clean and modern UI
- Easy to use interface
- No database required (messages are not persisted)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simple-chat-app.git
cd simple-chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Open multiple browser windows/tabs to `http://localhost:3000`
2. Start chatting! Messages will appear in real-time across all connected clients

## Project Structure

```
simple-chat-app/
├── public/
│   └── index.html      # Frontend HTML and client-side JavaScript
├── server.js           # Express and Socket.IO server
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Technologies Used

- Node.js
- Express.js
- Socket.IO
- HTML5
- CSS3
- JavaScript (ES6+)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


**This project defines:**

1. Workflow (workflows.py) - Defines the logic for running shell commands.
2. Activity (activities.py) - Executes the shell command securely.
3. Worker (worker.py) - Runs the Temporal worker that listens for workflow requests.


**How to run it locally:**

1. make Install : Install dependencies
2. Start Temporal server: https://confluence.internal.salesforce.com/display/TEMPORAL/Run+Temporal+Locally
3. start worker: make start-worker
4. Execute a worflow: <br>
  a. Using Makefile: make run-workflow CMD="ls -lhrt" <br>
  b. Direct python execution: python run_workflow.py ls-lhrt
  
  
  
