const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 9000;
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle a socket connection request from web client



