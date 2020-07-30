const main = document.getElementById('main');
const width = document.body.clientWidth;
const height = document.body.clientHeight;
const gravity = { x: 0, y: 1 };
const spray = { x: 0, y: 0 };
const forces = [gravity, spray];
const particleArr = [];

let stopId;
let count = 0;

const random = (num) => (Math.random() * num);

function createParticle() {
    const particle = document.createElement('div');
    const pos = { x: width/2, y: 0 };
    const acc = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const mass = random(0.2);
    const dia = mass * 10 + 5;

    particle.style.position = "absolute";
    particle.style.width = dia + random(10) + "px";
    particle.style.height = dia + random(10) + "px";
    particle.style.left = pos.x + "px";
    particle.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    main.appendChild(particle);

    return {particle, pos, acc, velocity, mass, dia};
}

const reduceForces = (forces) => {
    return forces.reduce((prev, next) => {
        return {
            x: prev.x += next.x,
            y: prev.y + next.y
        };
    })
}

const applyForces = (force) => {
    particleArr.forEach(({acc, mass}) => {
        let weight = force.y * mass;
        let neg = random(2);
        let sprays = neg >= 1 ? random(-1) + force.x : random(1) + force.x;
        acc.x = sprays;
        acc.y = weight;
    })
}

const sprayer = (particleArr) => {
    particleArr.forEach(({particle, acc, velocity, pos}) => {
        velocity.x += acc.x;
        velocity.y += acc.y;
        pos.x += velocity.x;
        pos.y += velocity.y;
        particle.style.left = pos.x + "px";
        particle.style.top = pos.y + "px";
    })
}

const cleanUp = (particleArr) => {
    const newParticles = particleArr.filter(({particle, pos}, index) => {
        if(Math.abs(pos.x >= width || pos.x <= 0 || Math.abs(pos.y) >= height)) {
            main.removeChild(particle);
            delete particleArr[index];
        }
        return particle !== "empty";
    })
    return newParticles;
}

const createParticles = () => {
    count++;
    if(count >= 5) {
        const newParticle = new createParticle();
        particleArr.push(newParticle);
        count = 0;
    }
}

const gameLoop = (timestamp) => {
    const particles = cleanUp(particleArr);
    const acceleration = reduceForces(forces);
    createParticles();
    applyForces(acceleration);
    sprayer(particles);
    stopId = window.requestAnimationFrame(gameLoop);
}

gameLoop();


