var socket;
var color;
var hex1, size;

function setup() {
    createCanvas(1280, 720);
    background(51);

    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);

}

function clearCanvas() {
    
}

function newDrawing(data) {
    stroke(color(data.c));
    strokeWeight(data.s);
    line(data.x, data.y, data.px, data.py);
}

function mouseDragged() {
    hex = document.getElementById("hex1").value;
    size = document.getElementById("size").value;
    console.log('sending: ' + mouseX + ',' + mouseY + ',' + hex + ',' + size);
    var data = {
        x: mouseX,
        y: mouseY,
        px: pmouseX,
        py: pmouseY,
        c: hex,
        s: size
        /*text_data: {
            x: mouseX,
            y: mouseY,
            text: typed_text
        }
        */
    };
    socket.emit('mouse', data);

    
    strokeWeight(size);
    stroke(color(hex));
    line(mouseX, mouseY, pmouseX, pmouseY);
}
