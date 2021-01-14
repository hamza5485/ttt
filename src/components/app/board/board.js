import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Marker from '../marker';
import { PLAYERS } from '../../../static/players';

const useStyles = makeStyles(theme => ({
    root: {
        height: 400,
        width: 400,
        padding: '1em'
    },
    vert: {
        borderLeft: `4px solid black`,
        borderRight: `4px solid black`
    },
    hori: {
        borderTop: `4px solid black`,
        borderBottom: `4px solid black`
    },
    gridMargin: {
        marginTop: 30
    }
}));


const Board = () => {
    const classes = useStyles();
    const [playerTurn, setPlayerTurn] = React.useState(PLAYERS[0]);
    const [gameOver, setGameOver] = React.useState(false);
    const [status, setStatus] = React.useState(`Your Turn`);
    const [winningCord, setWinningCord] = React.useState('');
    const [boardState, setBoardState] = React.useState(() => {
        let b = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push('');
            }
            b.push(row);
        }
        return b;
    });

    const getCurrentPlayerMove = () => playerTurn === PLAYERS[0] ? "O" : "X";

    const makeMove = (y, x) => {
        if (!gameOver) {
            let currentBoard = [...boardState];
            if (currentBoard[y][x] === '') {
                currentBoard[y][x] = getCurrentPlayerMove();
                setBoardState(currentBoard);
                if (checkForWin(currentBoard, getCurrentPlayerMove())) {
                    setGameOver(true);
                    setStatus(`${playerTurn === PLAYERS[0] ? `YOU` : `AI`} WON!`);
                } else if (!containsEmptySpace(currentBoard)) {
                    setGameOver(true);
                    setStatus(`DRAW!`);
                } else {
                    setPlayerTurn(playerTurn === PLAYERS[0] ? PLAYERS[1] : PLAYERS[0]);
                    setStatus(status === `Your Turn` ? `AI's turn` : `Your Turn`);
                }
            }
        }
    };

    const checkForWin = (currentBoard, moveToCheck) => {
        for (let i = 0; i < currentBoard.length; i++) {
            // check horizontal (vertical on board GUI)
            if (currentBoard[i][0] === moveToCheck && currentBoard[i][1] === moveToCheck && currentBoard[i][2] === moveToCheck) {
                setWinningCord([
                    [i, 0],
                    [i, 1],
                    [i, 2]
                ]);
                return true;
            }

            // check vertical (horizontal on board GUI)
            if (currentBoard[0][i] === moveToCheck && currentBoard[1][i] === moveToCheck && currentBoard[2][i] === moveToCheck) {
                setWinningCord([
                    [0, i],
                    [1, i],
                    [2, i]
                ]);
                return true;
            }
        }
        // check diagonal 
        if (currentBoard[0][0] === moveToCheck && currentBoard[1][1] === moveToCheck && currentBoard[2][2] === moveToCheck) {
            setWinningCord([
                [0, 0],
                [1, 1],
                [2, 2]
            ]);
            return true;
        }

        // check anti diagonal
        if (currentBoard[2][0] === moveToCheck && currentBoard[1][1] === moveToCheck && currentBoard[0][2] === moveToCheck) {
            setWinningCord([
                [2, 0],
                [1, 1],
                [0, 2]
            ]);
            return true;
        }

        return false;
    };

    const containsEmptySpace = currentBoard => {
        for (let i = 0; i < currentBoard.length; i++) {
            for (let j = 0; j < currentBoard[i].length; j++) {
                if (currentBoard[i][j] === '')
                    return true;
            }
        }
        return false;
    };

    const isWinningSquare = arr => {
        if (winningCord.length === 3) {
            if (JSON.stringify(winningCord).indexOf(JSON.stringify(arr)) !== -1) return true;
        }
        return false;
    };

    const restartGame = () => window.location.reload();

    return (
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid container className={classes.root}>
                {boardState.map((i, vPoint) => (
                    <Grid item xs={4} key={vPoint} className={vPoint === 1 ? classes.vert : ''}>
                        {i.map((j, hPoint) => (
                            <Grid item xs={12} key={hPoint} className={hPoint === 1 ? classes.hori : ''} onClick={() => makeMove(vPoint, hPoint)}
                                style={gameOver && isWinningSquare([vPoint, hPoint]) ? { color: 'red' } : {}}
                            >
                                <Marker value={j} />
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
            <Grid className={classes.gridMargin} container alignItems="center" justify="center" direction="row">
                <Typography variant="h4" gutterBottom>
                    {status}
                </Typography>
            </Grid>
            <Grid className={classes.gridMargin} container alignItems="center" justify="center" direction="row">
                <Button variant="contained" onClick={restartGame}>
                    Restart
                </Button>
            </Grid>
        </Grid>
    );
};

export default Board;