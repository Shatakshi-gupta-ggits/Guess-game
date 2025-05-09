// Game elements
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const hintBtn = document.getElementById('hintBtn');
const newGameBtn = document.getElementById('newGameBtn');
const messageEl = document.getElementById('message');
const attemptsEl = document.getElementById('attempts');
const maxNumEl = document.getElementById('maxNum');

// Game variables
let maxNumber;
let randomNumber;
let attempts;
let gameActive = false;

// Start a new game
function startGame() {
    const max = prompt("Enter the maximum number for this round (e.g., 50, 100):");
    if (!max || isNaN(max) || max <= 1) {
        maxNumber = 50; // Default value
    } else {
        maxNumber = parseInt(max);
    }
    
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    gameActive = true;
    
    maxNumEl.textContent = maxNumber;
    attemptsEl.textContent = attempts;
    messageEl.textContent = `I'm thinking of a number between 1 and ${maxNumber}. Take a guess!`;
    guessInput.value = '';
    guessInput.focus();
    
    console.log(`The secret number is: ${randomNumber}`); // For debugging
}

// Check the user's guess
function checkGuess() {
    if (!gameActive) {
        messageEl.textContent = "Please start a new game first!";
        return;
    }
    
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > maxNumber) {
        messageEl.textContent = `Please enter a number between 1 and ${maxNumber}!`;
        guessInput.value = '';
        return;
    }
    
    attempts++;
    attemptsEl.textContent = attempts;
    
    if (guess === randomNumber) {
        // Player won
        gameActive = false;
        messageEl.innerHTML = `🎉 <strong>You got it!</strong> The number was ${randomNumber}.<br>It took you ${attempts} ${attempts === 1 ? 'try' : 'tries'}.`;
        createConfetti();
    } else if (guess < randomNumber) {
        messageEl.textContent = "Too low! Aim higher! 🚀";
    } else {
        messageEl.textContent = "Too high! Come down a bit! 🪂";
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// Provide a hint
function giveHint() {
    if (!gameActive) {
        messageEl.textContent = "Please start a new game first!";
        return;
    }
    
    const hintType = Math.floor(Math.random() * 3);
    let hint;
    
    if (hintType === 0) {
        // Range hint
        const lower = Math.max(1, randomNumber - 10);
        const upper = Math.min(maxNumber, randomNumber + 10);
        hint = `The number is between ${lower} and ${upper}.`;
    } else if (hintType === 1) {
        // Odd/even hint
        hint = `The number is ${randomNumber % 2 === 0 ? 'even' : 'odd'}.`;
    } else {
        // Multiple hint
        const multiples = [];
        for (let i = 2; i <= 5; i++) {
            if (randomNumber % i === 0) {
                multiples.push(i);
            }
        }
        if (multiples.length > 0) {
            hint = `The number is divisible by ${multiples.join(', ')}.`;
        } else {
            hint = "The number isn't divisible by 2, 3, 4, or 5.";
        }
    }
    
    messageEl.textContent = `💡 Hint: ${hint}`;
}

// Create confetti effect
function createConfetti() {
    const container = document.querySelector('.game-container');
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Event listeners
submitBtn.addEventListener('click', checkGuess);
hintBtn.addEventListener('click', giveHint);
newGameBtn.addEventListener('click', startGame);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Start the first game when page loads
startGame();