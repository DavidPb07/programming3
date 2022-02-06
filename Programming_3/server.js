var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


matrix = [];

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
 matrix = generator(45, 45, 30, 16, 20);


 grassArr = []
 grassEaterArr = []
 PredatorArr = []
 predEnergArr = []


 
 Grass = require("./Grass")
 GrassEater = require("./GrassEater")
 Predator = require("./Predator")
 PredEnerg = require("./PredEnerg")
 
 io.sockets.emit("send matrix", matrix)
 
 
 
 function createObject() {
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
        io.sockets.emit('send matrix', matrix)
    }
    
    function game() {
        for (let i in grassArr) {
            grassArr[i].mul()
        } 
    
        for (let i in grassEaterArr) {
            grassEaterArr[i].mul()
            grassEaterArr[i].eat()
        } 
        for (let i in PredatorArr) {
            PredatorArr[i].move()
        } 
        io.sockets.emit("send matrix", matrix);
    }
    
    setInterval(game, 1000)
    
    
    // function kill() {
    //     grassArr = [];
    //     grassEaterArr = []
    //     for (var y = 0; y < matrix.length; y++) {
    //         for (var x = 0; x < matrix[y].length; x++) {
    //             matrix[y][x] = 0;
    //         }
    //     }
    //     io.sockets.emit("send matrix", matrix);
    // }
    
    
    // function addGrass() {
    //     for (var i = 0; i < 7; i++) {
    //         var x = Math.floor(Math.random() * matrix[0].length)
    //         var y = Math.floor(Math.random() * matrix.length)
    //         if (matrix[y][x] == 0) {
    //             matrix[y][x] = 1
    //             var gr = new Grass(x, y, 1)
    //             grassArr.push(gr)
    //         }
    //     }
    //     io.sockets.emit("send matrix", matrix);
    // }
    // function addGrassEater() {
    //     for (var i = 0; i < 7; i++) {   
    //         var x = Math.floor(Math.random() * matrix[0].length)
    //         var y = Math.floor(Math.random() * matrix.length)
    //         if (matrix[y][x] == 0) {
    //             matrix[y][x] = 2
    //             grassEaterArr.push(new GrassEater(x, y, 2))
    //         }
    //     }
    //     io.sockets.emit("send matrix", matrix);
    // }
    
    
    // weath = "winter";
    
    // function weather() {
        //     if (weath == "winter") {
            //         weath = "spring"
            //     }
            //     else if (weath == "spring") {
                //         weath = "summer"
                //     }
                //     else if (weath == "summer") {
                    //         weath = "autumn"
                    //     }
                    //     else if (weath == "autumn") {
                        //         weath = "winter"
                        //     }
                        //     io.sockets.emit('weather', weath)
                        // }
                        // setInterval(weather, 5000);
                        
io.on('connection', function () {
    createObject();
    // socket.on("kill", kill);
    // socket.on("add grass", addGrass);
    // socket.on("add grassEater", addGrassEater);
});


// var statistics = {};

// setInterval(function() {
//     statistics.grass = grassArr.length;
//     statistics.grassEater = grassEaterArr.length;
//     fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
//         console.log("send")
//     })
// },1000)