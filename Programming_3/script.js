let socket = io();
var side = 20;

function setup() {
    createCanvas(45 * side, 45 * side);
    background('#acacac');
    frameRate(5)
    
}


function nkarel(matrix) {
    console.log(matrix);
    
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        var obj = matrix[y][x];
        if (obj == 1) {
            fill("green");
            rect(x * side, y * side, side, side)
        }
        else if (obj == 2) {
            fill("yellow");
            rect(x * side, y * side, side, side);
        }
        else if (obj == 3) {
            fill("black");
            rect(x * side, y * side, side, side);
        }
        else if (obj == 4) {
            fill("red");
            rect(x * side, y * side, side, side);
        }
        else if (obj == 0) {
            fill("#acacac");
            rect(x * side, y * side, side, side);
        }
    }
}
}
socket.on('send matrix', nkarel)
