let socket;

function setup() {
  createCanvas(400, 400);
  background(220);

  // Connect to local WebSocket server
  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onerror = (error) => {
    console.error('WebSocket Error:', error);
  };
}

function draw() {
  fill(0);
  ellipse(mouseX, mouseY, 10, 10);
}

function mousePressed() {
  // Send OSC-style message over WebSocket
  const msg = {
    address: '/mouse/position',
    args: [
      { type: 'f', value: mouseX },
      { type: 'f', value: mouseY }
    ]
  };

  socket.send(JSON.stringify(msg));
}