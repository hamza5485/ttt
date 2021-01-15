export const PLAYERS = {
    AI: 'O',
    HUMAN: 'X'
};

export const checkForWin = (currentBoard, moveToCheck) => {
    for (let i = 0; i < currentBoard.length; i++) {

        // check horizontal (vertical on board GUI)
        if (currentBoard[i][0] === moveToCheck && currentBoard[i][1] === moveToCheck && currentBoard[i][2] === moveToCheck) {
            return {
                isWin: true,
                winningCord: [
                    [i, 0],
                    [i, 1],
                    [i, 2]
                ]
            };
        }

        // check vertical (horizontal on board GUI)
        if (currentBoard[0][i] === moveToCheck && currentBoard[1][i] === moveToCheck && currentBoard[2][i] === moveToCheck) {
            return {
                isWin: true,
                winningCord: [
                    [0, i],
                    [1, i],
                    [2, i]
                ]
            };
        }
    }

    // check diagonal 
    if (currentBoard[0][0] === moveToCheck && currentBoard[1][1] === moveToCheck && currentBoard[2][2] === moveToCheck) {
        return {
            isWin: true,
            winningCord: [
                [0, 0],
                [1, 1],
                [2, 2]
            ]
        };
    }

    // check anti diagonal
    if (currentBoard[2][0] === moveToCheck && currentBoard[1][1] === moveToCheck && currentBoard[0][2] === moveToCheck) {
        return {
            isWin: true,
            winningCord: [
                [2, 0],
                [1, 1],
                [0, 2]
            ]
        };
    }

    return {
        isWin: false,
        winningCord: []
    };
};

export const containsEmptySpace = currentBoard => {
    for (let i = 0; i < currentBoard.length; i++) {
        for (let j = 0; j < currentBoard[i].length; j++) {
            if (currentBoard[i][j] === '')
                return true;
        }
    }
    return false;
};