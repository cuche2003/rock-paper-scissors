var playerScore = 0;
var computerScore = 0;
const matchPoint = 5;
var loopDelayCounter = 0; 
var playerWins = 0;
var computerWins = 0;

const buttonCtn = document.getElementById("button-container");
const buttons = document.querySelectorAll(".choice");
const roundResult = document.querySelectorAll(".round-result");
const matchResult = document.getElementById("match-result");
const scoreBoard = document.getElementById("scoreboard");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const introText = document.querySelectorAll(".intro-text");
const introCtn = document.getElementById("intro-container");
const replayButton = document.getElementById("replay-button");
const outroText = document.getElementsByClassName("outro-text");
const rewardButton = document.getElementById("reward-button");

var buttonsUnderTransition = {
    "0": 0,
    "1": 0,
    "2": 0,
  };

function computerPlay() {
    const computerChoice = Math.floor(Math.random() * 3);
    return computerChoice;
}

function playRound(playerSelection, computerSelection) {  
    let result = "";
    if (playerSelection == computerSelection) {
        result = "Draw!";
    }
        else if ((playerSelection + 1) % 3 == computerSelection) {  //very cheeky algorithm,  
            result = "I win this round!";                           //converting options into numbers
            computerScore += 1;
        }
        else {
            result = "You win this round!";
            playerScore += 1;
        }
    roundResult[0].textContent = result;        
}

function playRoundHackmode() {
    let result = "";
    if (Math.floor(Math.random() * 2)) {
        result = "I win this round!";
        computerScore += 1;
    }
        else {result = "Draw!";}
    for (let i = 0; i < roundResult.length; i++) {
        roundResult[i].textContent = result;
    }
}

function hideScoreDisplay() {
    scoreBoard.style.display = "none";
}

function showScoreDisplay() {
    scoreBoard.style.display = "flex";
}

function updateScoreDisplay() {
    playerScoreDisplay.textContent = "You: " + playerScore;
    computerScoreDisplay.textContent = "Me: " + computerScore;
}

function checkMatchResult() {
    if (playerScore === matchPoint || computerScore === matchPoint) {
        if (computerWins === 19) {
            computerWins += 1;
            displayOutro();
        }
            else displayMatchResult();
    }
}

function displayMatchResult() {
    buttonCtn.classList.add("disappear");
    for(let i = 0; i < roundResult.length; i++) {
        roundResult[i].style.display = "none";
    } 
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    } 
    setTimeout(function(){ 
        for(let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    } 
    matchResult.textContent = "";
    matchResult.style.display = "block";
    if (playerScore === matchPoint) {
        if (computerWins < 20) {
            matchResult.classList.remove("blue-text");
            matchResult.classList.add("red-text");
            matchResult.textContent = "You won the match! Well done cheater!";
        }
            else {
                matchResult.classList.remove("red-text");
                matchResult.classList.add("blue-text");
                matchResult.textContent = "You won the match! Well done!";
                playerWins += 1;
            }
        }
        else {
            matchResult.classList.remove("blue-text");
            matchResult.classList.add("red-text");
            switch(computerWins) {
            case 10: 
                matchResult.textContent = "You are a stubborn one, aren't you?";
                break;
            case 11: 
                matchResult.textContent = "Why are you still here?";
                break;
            case 12: 
                matchResult.textContent = "This game has no endings, you know.";
                break;
            case 13: 
                matchResult.textContent = "No secrets either.";
                break;
            case 14: 
                matchResult.textContent = "Just leave.";
                break;
            case 15: 
                matchResult.textContent = "Why?";
                break;
            case 16: 
                matchResult.textContent = "...";
                break;
            case 17:
                matchResult.textContent = "Is it, you like playing with me?"
                break;
            case 18:
                matchResult.textContent = "..."
                break;
            default: {
            if(computerWins < 20) { 
                switch(Math.floor(Math.random() * 4)) {
                    case 0: 
                        matchResult.textContent = "I won. GGWP";
                        break;
                    case 1:
                        matchResult.textContent = "Not going to beat me any soon!";
                        break;
                    case 2:
                        matchResult.textContent = "Go play with someone your level";
                        break;
                    case 3:
                        matchResult.textContent = "Can this game be any easier?";
                        break;
                    case 4:
                        matchResult.textContent = "*yawns Next opponent please?";
                        break;
            }
            }
                else {
                    switch(Math.floor(Math.random() * 4)) {
                        case 0: 
                            matchResult.textContent = "Don't worry, I believe in you!";
                            break;
                        case 1:
                            matchResult.textContent = "You cannot surrender here!";
                            break;
                        case 2:
                            matchResult.textContent = "You can do it. JUST DO IT !!!";
                            break;
                        case 3:
                            matchResult.textContent = "Victory is gonna be in your hand soon!";
                            break;
                        case 4:
                            matchResult.textContent = "Never give up!";
                            break;
                }
            }
        }
    }
            computerWins += 1;
        }
    replayButton.style.display = "block";
    if (playerWins >= 5) {
        rewardButton.style.display = "block";
    }
    }, 1000);
}

function buttonHover(e) {
    const button = e.target;
    button.classList.add("mouseover");
}

function removeAnimation(e) {
    const button = e.target;
    button.classList.remove("mouseover");
}

function buttonClick(e) {
    const button = e.target;
    if (buttonsUnderTransition[button.dataset.play]) {
        return;
      }
    buttonsUnderTransition[button.dataset.play] = 2;
    button.classList.add("clicked");
    if (playerScore >= 4 && computerWins < 20) {
        roundResult[0].classList.add("glitch-1"); //triggers glitched text
        playRoundHackmode();
    }
        else playRound(button.dataset.play, computerPlay());
    updateScoreDisplay();
    checkMatchResult();
}

function removeTransition(e) {
    const button = e.target;
    const dataPlay = e.target.getAttribute('data-play');
    const underTransitionVal = buttonsUnderTransition[dataPlay];
    if (underTransitionVal === 2) {
      setTimeout(function() {
        buttonsUnderTransition[dataPlay] = 1;
      }, 30);
    } else if (underTransitionVal === 1) {
      buttonsUnderTransition[dataPlay] = 0;
    }
    if (e.propertyName !== "transform") return;
    button.classList.remove("clicked");
}

function initButtons() {
    buttons.forEach((button) => {
        button.addEventListener("mouseover", buttonHover);
        button.addEventListener("mouseleave", removeAnimation);
        button.addEventListener("click", buttonClick);
        button.addEventListener("transitionend", removeTransition);
        } 
    );
    replayButton.addEventListener("mouseover", buttonHover);
    replayButton.addEventListener("mouseleave", removeAnimation);
    replayButton.addEventListener("transitionend", removeTransition);
    replayButton.addEventListener("click", replayGame);
    rewardButton.addEventListener("mouseover", buttonHover);
    rewardButton.addEventListener("mouseleave", removeAnimation);
    rewardButton.addEventListener("transitionend", removeTransition);
    rewardButton.addEventListener("click", replayGame);
}

function loopDelay(func1, func2, times, delay) {                        
    setTimeout(function() {    
    func1();                    
    loopDelayCounter++;                                  
    if (loopDelayCounter < times) {  
        loopDelay(func1, func2, times, delay);                        
    } 
    else {loopDelayCounter = 0; func2();}                                    
  }, delay)
}

function displayIntro() {
    introText[loopDelayCounter].classList.add("appear");
}

function gameStart() {
    introCtn.style.display = "none";
    displayButtons();
    updateScoreDisplay();
}

function displayButtons() {
    buttonCtn.style.display = "flex";
    buttonCtn.classList.add("appear");
}

function replayGame () {
    for (i = 0; i < outroText.length; i++) {
        if (outroText[i].style.display !== "none") {
            outroText[i].style.display = "none";
        }
    }
    showScoreDisplay();
    matchResult.style.display = "none";
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    buttonCtn.classList.remove("disappear");
    buttonCtn.classList.add("appear");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "block";
        buttons[i].disabled = false;
    }
    for(let i = 0; i < roundResult.length; i++) {
        roundResult[i].textContent = "";
        roundResult[i].style.display = "block";
    } 
    roundResult[0].classList.remove("glitch-1");
    replayButton.style.display = "none";
    if (playerWins >= 5) {
        rewardButton.style.display = "none";
    }
}

function displayOutro() {
    hideScoreDisplay();
    buttonCtn.classList.add("disappear");
    for(let i = 0; i < roundResult.length; i++) {
        roundResult[i].style.display = "none";
    } 
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    } 
    setTimeout(function() { 
        for(let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "none";
    }
    loopDelay(displayOutroText, replayGame, outroText.length, 2000);
    }, 1000);
}

function displayOutroText() {
    outroText[loopDelayCounter].style.display = "block";
    outroText[loopDelayCounter].classList.add("appear");
}

loopDelay(displayIntro, gameStart, introText.length, 1000);
initButtons();
