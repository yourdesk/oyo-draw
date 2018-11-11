var socket;
var color;
var hex1, size;

function setup() { // connect to server and define variables
    createCanvas(1280, 720);
    background(51);

    socket = io.connect('http://localhost:3000'); // connect to port 3000
    socket.on('mouse', newDrawing); // if mouse is dragged, run mouseDragged()

}

function newDrawing(data) { // make new drawing for other users
    stroke(color(data.c));
    strokeWeight(data.s);
    line(data.x, data.y, data.px, data.py);
}

function keyPressed() { // if key pressed, do this
    

}

function mouseDragged() {
    hex = document.getElementById("hex1").value; // get hex value for color
    size = document.getElementById("size").value; // get size
    console.log('sending: ' + mouseX + ',' + mouseY + ',' + hex + ',' + size); // logging
    var data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY,
        c: hex,
        s: size
    }; // data to send
    socket.emit('mouse', data); // sends data to server

    
    strokeWeight(size); // size
    stroke(color(hex)); // color
    line(mouseX, mouseY, pmouseX, pmouseY); // draw a line
}
