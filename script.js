document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const winDisplay = document.querySelector(".win");
    const player1 = document.querySelector(".p1");
    const player2 = document.querySelector(".p2");
    let currentPlayer = "1";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (clickedBox, clickedBoxIndex) => {
        gameState[clickedBoxIndex] = currentPlayer;
        clickedBox.innerHTML = currentPlayer === "1" ? '<img src="cross.svg" alt="X" class="cx">' : '<img src="circle.svg" alt="O" class="cx">';
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === "1" ? "2" : "1";
        player1.classList.toggle("active", currentPlayer === "1");
        player2.classList.toggle("active", currentPlayer === "2");
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            winDisplay.innerHTML = `Player ${currentPlayer} Wins!`;
            winDisplay.style.display = "block";
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            winDisplay.innerHTML = "Draw!";
            winDisplay.style.display = "block";
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handleBoxClick = (clickedBoxEvent) => {
        const clickedBox = clickedBoxEvent.target;
        const clickedBoxIndex = Array.from(boxes).indexOf(clickedBox);

        if (gameState[clickedBoxIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedBox, clickedBoxIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        currentPlayer = "1";
        gameActive = true;
        gameState = ["", "", "", "", "", "", "", "", ""];
        winDisplay.style.display = "none";
        boxes.forEach(box => box.innerHTML = "");
        player1.classList.add("active");
        player2.classList.remove("active");
    };

    boxes.forEach(box => box.addEventListener("click", handleBoxClick));
    winDisplay.addEventListener("click", handleRestartGame);
});
