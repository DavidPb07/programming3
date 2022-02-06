let LivingCreature = require('./LivingCreature')

module.exports = class PredEnerg  extends LivingCreature{
    constructor(x, y,) {
       super(x,y,)
        this.energy = 30;
        this.multiply = 0
        this.directions = [];
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

