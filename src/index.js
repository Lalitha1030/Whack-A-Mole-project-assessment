 // DOM Elements
        const holes = document.querySelectorAll('.hole');
        const scoreDisplay = document.getElementById('score');
        const timeDisplay = document.getElementById('time');
        const startButton = document.getElementById('start-btn');

        // Game Tracking states
        let score = 0;
        let timeLeft = 20;
        let gameInterval;
        let countdownInterval;
        let activeHole = null;
        let isGameRunning = false;

        // Reset elements and start timer strings
        function startGame() {
            if (isGameRunning) return; // Block double starts
            isGameRunning = true;
            score = 0;
            timeLeft = 20;
            scoreDisplay.textContent = score;
            timeDisplay.textContent = timeLeft;
            startButton.disabled = true;

            // Loop to pop up moles every 800ms
            gameInterval = setInterval(peepMole, 800);
            // Game clock countdown tracking
            countdownInterval = setInterval(updateTimer, 1000);
        }

        // Logic to clear existing mole visual states and pick next hole
        function peepMole() {
            // Remove previous active mole state
            if (activeHole) {
                activeHole.classList.remove('up');
            }

            // Pick a random grid position
            const randomIndex = Math.floor(Math.random() * holes.length);
            activeHole = holes[randomIndex];
            
            // Pop the mole up visually
            activeHole.classList.add('up');
        }

        // Handle score addition when clicking the mole element
        function whack(e) {
            // Security check against synthetic script-simulated clicks
            if(!e.isTrusted) return; 
            
            // Validate the parent container currently has the active class
            if (this.parentNode.classList.contains('up')) {
                score++;
                scoreDisplay.textContent = score;
                this.parentNode.classList.remove('up'); // Force mole back down immediately
            }
        }

        // Countdown system 
        function updateTimer() {
            timeLeft--;
            timeDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                clearInterval(countdownInterval);
                if (activeHole) activeHole.classList.remove('up');
                
                isGameRunning = false;
                startButton.disabled = false;
                alert(`Game Over! Final Score: ${score}`);
            }
        }

        // Event Listeners Allocation
        startButton.addEventListener('click', startGame);
        document.querySelectorAll('.mole').forEach(mole => {
            mole.addEventListener('click', whack);
        });