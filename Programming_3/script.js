function generator(matLen, gr, grEat, pred, predEnerg) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < predEnerg; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    return matrix;
}
let matrix = generator(45, 45, 30, 16, 20);
var side = 22;
let grassArr = []
let grassEaterArr = []
let PredatorArr = []
let predEnergArr = []
function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(5)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            }else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                PredatorArr.push(gr)
            }else if (matrix[y][x] == 4) {
                let gr = new PredEnerg(x, y)
                predEnergArr.push(gr)
            }
        }
    }
}


function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2){
                fill("yellow")
            }
            else if (matrix[y][x] == 3){
                fill("black")
            }
            else if (matrix[y][x] == 4){
                fill("red")
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            
            rect(x * side, y * side, side, side);
        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
    } 

    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    } 
    for (let i in PredatorArr) {
        PredatorArr[i].eat()
    } 
}
