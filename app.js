// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Create an Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Enable CORS for all routes
app.use(cors({
  origin: '*'
}));

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(__dirname + '/public'));

// Define a route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

//   console.log();

  // Handle chat messages
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});