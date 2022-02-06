let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature{
    constructor(x, y,index) {
        super(x, y, index)
        this.energy = 50;
        this.multiply = 0
        this.directions = [];   
    }


    move() {
        this.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells1 = super.chooseCell(1)
        var newCell1 = emptyCells1 [Math.floor(Math.random() * emptyCells1.length)]
        if (newCell && super.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[super.y][super.x]
            matrix[super.y][super.x] = 0
            super.x = newX
            super.y = newY
        }
        else if (newCell1 && super.energy >= 0) {
                var newX = newCell1[0]
                var newY = newCell1[1]
                matrix[newY][newX] = matrix[super.y][super.x]
                matrix[super.y][super.x] = 1
                super.x = newX
                super.y = newY
        } else {
            if (super.energy < 0) {
                super.die()
            }
        }
    }
    eat() {
        var emptyCells = super.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells1 = super.chooseCell(4)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[super.y][super.x]
            matrix[super.y][super.x] = 0
            super.x = newX
            super.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        } else if (newCell1) {
            this.energy++
            var newX = newCell1[0]
            var newY = newCell1[1]

            matrix[newY][newX] = matrix[super.y][super.x]
            matrix[super.y][super.x] = 0
            super.x = newX
            super.y = newY
            for (var i in predEnergArr) {
                if (newX == predEnergArr[i].x && newY == predEnergArr[i].y) {
                    predEnergArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            super.move()
        }
    }
    die() {
        matrix[super.y][super.x] = 0;
        for (var i in PredatorArr) {
            if (super.x == PredatorArr[i].x && super.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
    }
}