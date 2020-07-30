const ball = document.createElement('div');
const main = document.querySelector('.container');
ball.style.width = "50px";
ball.style.height = "50px";
ball.style.borderRadius = "50%";
ball.style.backgroundColor = `rgb(255, 0, 0)`;
main.append(ball);

function Vector(arr) {
    this.arr = arr;
}

const add = vector => {
    if(this.arr.length === vector.arr.length) {
        var result=[];
        for(var i=0; i<this.arr.length; i++)
            result.push( this.arr[i] + vector.arr[i] );
        return new Vector(result);
    } else
        return error;
}
Vector.prototype.add = add;

const pos = new Vector([0, 0]);
const velocity = new Vector([0, 0]);
const accel = new Vector([2, 10]);

const move = (ball) => {
    ball.style.left += pos[0];
    ball.style.left += pos[1];
}

const gameLoop = () => {
    move(ball);
}