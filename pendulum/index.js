const myCanvas = {
    canvas: document.createElement("canvas"),
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    start() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(game, 20);
        document.body.appendChild(this.canvas);
    }
}

function Circle(x, y, radius, color) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.gravity = 0.1;
    this.radius = radius;
    this.mass = this.radius / 4;
    this.weight = this.mass * this.gravity;
    this.angle = Math.PI / 4;
    this.aVel = 0.0;
    this.aAcc = 0.0;
    this.show = () => {
        context = myCanvas.context;
        context.save();
        context.fillStyle = color;
        context.strokeStyle = color;
        context.translate(myCanvas.width/2, myCanvas.height/2);
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        context.restore();
    }
    this.rotate = () => {
        this.aVel += this.aAcc;
        this.angle += this.aVel;
        this.aAcc = 0;
    }
    this.swing = () => {
        this.x = 200 * Math.sin(this.angle);
        this.y = 200 * Math.cos(this.angle);
        this.weight = this.mass * this.gravity;
        this.aAcc = (-0.0001 * this.weight) * Math.sin(this.angle);
        this.aVel += this.aAcc;
        this.aVel *= 0.9999;

        this.angle += this.aVel;
    }
}

function Line() {
    this.context = myCanvas.context;
    this.show = () => {
        context.beginPath();
        context.translate(myCanvas.width/2, myCanvas.height/2);
        context.lineWidth = 2;
        context.lineCap = "round";
        context.moveTo(0, 0);
        context.lineTo(circle.x, circle.y);
        context.strokeStyle = circle.color;
        context.stroke();
    }
}

const circle = new Circle(0, 200, 50, "cyan");
const line = new Line();
const game = () => {
    myCanvas.start();
    circle.show();
    circle.swing();
    line.show();
}

window.addEventListener("keydown", e => {
    switch(e.key) {
        case " ":
            circle.aVel += 0.01;
            break;
    }
})

game();