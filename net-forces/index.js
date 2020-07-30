const main = document.querySelector('.container')
const windowHeight = document.body.clientHeight;
const windowWidth = document.body.clientWidth;
const ballArr = [];
const gravity = { x: 0, y: 2 };
const wind = { x: 0, y: 0 };
const xfriction = { x: 0, y: 0 };
const forces = [gravity, wind, xfriction];
let stopId;
let bounces = 0;

const createBall = (x, y) => {
    const ball = document.createElement('div');
    const pos = { x, y };
    const accel = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const dia = random(100) + 10;
    const r = Math.floor(dia / 2);
    const mass = Math.floor(Math.PI * (r * r));

    ball.classList.add('circle');
    ball.style.width = dia + "px";
    ball.style.height = dia + "px";
    ball.style.left = x + "px";
    ball.style.top = y + "px";

    main.appendChild(ball);
    return {ball, pos, mass, velocity, accel, dia};
}

const move = (ballArr) => {
    ballArr.forEach(({ball, velocity, accel, pos}) => {
        velocity.x += accel.x;
        velocity.y += accel.y;
        pos.x += velocity.x;
        pos.y += velocity.y;
        
        ball.style.left = pos.x + "px";
        ball.style.top = pos.y + "px";
    })
}

const friction = (bounces, velocity) => {
    if(bounces >= 30 * ballArr.length) {
        velocity.y = 0;
        Math.floor(velocity.x *= 0.98);
    }
}

const bounce = (ballArr, windowHeight, windowWidth) => {
    ballArr.forEach(({pos, velocity, dia}) => {
        dia += 2;
        if(pos.y >= windowHeight - dia) {// Bounce
            pos.y = windowHeight - dia;
            velocity.y *= -1;
            bounces++;
            friction(bounces, velocity);
        }
        if(pos.x >= windowWidth - dia) {
            pos.x = windowWidth - dia;
            velocity.x *= -1;
        }
        else if(pos.x <= 0) {
            pos.x = 0;
            velocity.x *= -1; 
        }
    })
}

const reduceForces = (forces) => {
    const reduced = forces.reduce((prev, curr, index) => {
        return {
            x: prev.x + curr.x,
            y: prev.y + curr.y
        }
    })
    return reduced;
}

const applyForce = (acceleration) => {
    ballArr.forEach(({accel, mass}) => {
        let gravity = Math.floor(acceleration.y * mass);
        const wind = (acceleration.x / mass);
        gravity /= mass;

        accel.x = wind;
        accel.y = gravity;
    })
}

const random = num => {
    return Math.floor(Math.random() * num);
}

window.addEventListener("keydown", key => {
    console.log(key);
    const acceleration = reduceForces(forces);
    switch(key.code) {
        case "Space":
            forces[1].x += 10;
            break;
        case "Escape":
            window.cancelAnimationFrame(stopId);
            break;
        case "ShiftLeft":
            forces[1].x = 0;
    }
})

for(let i = 1; i <= 3; i++) {
    const elem = createBall(random(700), 0);
    elem.ball.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`
    ballArr.push(elem);
}

const gameLoop = () => {
    const acceleration = reduceForces(forces);
    applyForce(acceleration);
    move(ballArr);
    bounce(ballArr, windowHeight, windowWidth);
    stopId = window.requestAnimationFrame(gameLoop);
}

gameLoop();