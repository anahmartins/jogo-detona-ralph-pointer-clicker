document.getElementById("reinicia").addEventListener("click", resetgame);

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 700,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        lives: 3,
    },

    actions:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    },

    sounds: {
        hit: new Audio('./src/audios/hit.m4a'),
        error: new Audio('./src/audios/error.mp3'),
    }
};

state.sounds.hit.volume = 0.2;
state.sounds.error.volume = 0.5;

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Your score is " + state.values.result);
        resetgame();
    }
}

function playSound(sounds) {
    sounds.curretTime = 0;
    sounds.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                playSound(state.sounds.hit);
            }

            else {
                state.values.lives--
                state.view.lives.textContent = state.values.lives;
                playSound(state.sounds.error);

                if (state.values.lives === 0) { 
                clearInterval(state.actions.countDownTimerId); 
                clearInterval(state.actions.timerId);
        
                alert("Game Over! Suas vidas acabaram! Sua pontuação foi de " + state.values.result);
                resetgame();
                }
            }

            state.values.hitPosition = null
        })
    });
    } 

function resetgame(){
    clearInterval(state.actions.countDownTimerId); 
    clearInterval(state.actions.timerId);


    state.values.result = 0;
    state.values.curretTime = 60;
    state.values.lives = 3;
    state.values.gameVelocity = 1000;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = state.values.lives;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    resetmoviment();
}

function initialize() {
    alert("Bem vindo ao jogo Hit Ralph! Clique em OK para começar!");
    moveEnemy();
    addListenerHitBox();
}

initialize()  