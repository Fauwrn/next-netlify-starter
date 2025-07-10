// server.js
const WebSocket = require('ws');
const osc = require('osc');

const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket server running on ws://localhost:8080');

// Setup OSC UDP Port (e.g., send to SuperCollider or Max/MSP)
const udpPort = new osc.UDPPort({
  localAddress: '127.0.0.1',
  localPort: 57121,
  remoteAddress: '127.0.0.1',
  remotePort: 57120
});

udpPort.open();

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const oscMessage = JSON.parse(message);
      console.log('Sending OSC:', oscMessage);
      udpPort.send(oscMessage);
    } catch (err) {
      console.error('Invalid message:', err);
    }
  });
});