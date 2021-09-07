var playerScore = 0;
var computerScore = 0;
const matchPoint = 5;
var loopDelayCounter = 0; 
var matchWon = 0;

const buttonCtn = document.getElementById("button-container");
const buttons = document.querySelectorAll(".choice");
const roundResult = document.querySelectorAll(".round-result");
const matchResult = document.getElementById("match-result");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const introText = document.querySelectorAll(".intro-text");
const introCtn = document.getElementById("intro-container");

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

function updateScoreDisplay() {
    playerScoreDisplay.textContent = "You: " + playerScore;
    computerScoreDisplay.textContent = "Me: " + computerScore;
}

function checkMatchResult() {
    if (playerScore === matchPoint || computerScore === matchPoint) {
        displayMatchResult();
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
    (playerScore === matchPoint)? 
        matchResult.textContent = "You won the match! Well done cheater!": 
        matchResult.textContent = "I won the match! GGWP.";
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
    if (playerScore < 4) playRound(button.dataset.play, computerPlay()); //data-play == playerPlay()
        else {
            roundResult[0].classList.add("glitch-1"); //triggers glitched text
            playRoundHackmode();
        }
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

function displayButtons() {
    introCtn.style.display = "none";
    buttonCtn.style.display = "flex";
    buttonCtn.classList.add("appear");
}

loopDelay(displayIntro, displayButtons, introText.length, 1000);
initButtons();

            
