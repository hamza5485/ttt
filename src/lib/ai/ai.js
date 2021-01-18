import { checkForWin, containsEmptySpace, PLAYERS } from '../common/helper';

class AI {

    makeMove(board, isFirstMove) {
        if (isFirstMove) {
            if (board[1][1] === '') return [1, 1]; // place on center if center available
            else { // place on any random corner (all avilable since human placed on center)
                const corner = [
                    [0, 0],
                    [0, 2],
                    [2, 0],
                    [2, 2]
                ];
                return corner[Math.floor(Math.random() * Math.floor(4))];
            }
        } else {
            return this._makeBestMove(board);
        }
    }

    _makeBestMove(board) {
        let bestValue = -Infinity;
        let bestMove = [-1, -1];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    board[i][j] = PLAYERS.AI;
                    let moveValue = this._minimax(board, 1, false);
                    board[i][j] = '';

                    if (moveValue > bestValue) {
                        bestMove[0] = i;
                        bestMove[1] = j;
                        bestValue = moveValue;
                    }
                }
            }
        }
        return bestMove;
    }

    _evaluteBoardState(board) {
        let score;
        if (checkForWin(board, PLAYERS.HUMAN, false).isWin) {
            score = -10;
        } else if (checkForWin(board, PLAYERS.AI, false).isWin) {
            score = 10;
        } else if (!containsEmptySpace(board)) {
            score = 0;
        }
        return score;
    }

    _minimax(board, depth, maximize) {
        let score = this._evaluteBoardState(board);
        if (score === 10 || score === -10 || score === 0) return score;

        if (maximize) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = PLAYERS.AI;
                        bestScore = Math.max(bestScore, this._minimax(board, depth + 1, !maximize));
                        board[i][j] = '';
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;

            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === '') {
                        board[i][j] = PLAYERS.HUMAN;
                        bestScore = Math.min(bestScore, this._minimax(board, depth + 1, !maximize));
                        board[i][j] = '';
                    }
                }
            }
            return bestScore;
        }
    }
}

export default AI;