import React, { useEffect } from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Marker from '../marker';
import { checkForWin, containsEmptySpace, PLAYERS } from '../../../lib/common/helper';
import AI from '../../../lib/ai/ai';


const useStyles = makeStyles(theme => ({
    root: {
        height: 360,
        width: 360,
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
    const ai = new AI();
    const [aiFirstMove, setAiFirstMove] = React.useState(true);
    const [playerTurn, setPlayerTurn] = React.useState(PLAYERS.HUMAN);
    const [gameOver, setGameOver] = React.useState(false);
    const [isDraw, setIsDraw] = React.useState(false);
    const [status, setStatus] = React.useState(`Your Turn`);
    const [winningCord, setWinningCord] = React.useState(null);
    const [boardState, setBoardState] = React.useState(() => {
        let b = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push('');
            }
            b.push(row);
        }
        console.log(b);
        return b;
    });

    const playerClick = (i, j) => playerTurn === PLAYERS.HUMAN && makeMove(i, j);

    const makeMove = (i, j) => {
        // console.log(boardState); remove me
        if (!gameOver) {
            let currentBoard = [...boardState];
            if (currentBoard[i][j] === '') {
                currentBoard[i][j] = playerTurn;
                setBoardState(currentBoard);
                const winStatus = checkForWin(currentBoard, playerTurn);
                if (winStatus.isWin) {
                    setGameOver(true);
                    setWinningCord(winStatus.winningCord);
                    setStatus(`${playerTurn === PLAYERS.HUMAN ? `YOU` : `AI`} WON!`);
                } else if (!containsEmptySpace(currentBoard)) {
                    setGameOver(true);
                    setIsDraw(true);
                    setStatus(`DRAW!`);
                } else {
                    setPlayerTurn(playerTurn === PLAYERS.HUMAN ? PLAYERS.AI : PLAYERS.HUMAN);
                    setStatus(status === `Your Turn` ? `AI's turn` : `Your Turn`);
                }
            }
        }
    };

    const isWinningSquare = arr => {
        if (winningCord.length === 3) {
            if (JSON.stringify(winningCord).indexOf(JSON.stringify(arr)) !== -1) return true;
        }
        return false;
    };

    const restartGame = () => window.location.reload();

    useEffect(() => {
        if (playerTurn === PLAYERS.AI) {
            let aiMove = ai.makeMove(JSON.parse(JSON.stringify(boardState)), aiFirstMove);
            if (aiFirstMove) setAiFirstMove(false);
            makeMove(aiMove[0], aiMove[1]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerTurn]);

    return (
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid container className={classes.root}>
                {boardState.map((column, colIndex) => (
                    <Grid item xs={4} key={colIndex} className={colIndex === 1 ? classes.vert : ''}>
                        {column.map((row, rowIndex) => (
                            <Grid item xs={12} key={rowIndex} className={rowIndex === 1 ? classes.hori : ''} onClick={() => playerClick(colIndex, rowIndex)}
                                style={gameOver && !isDraw && isWinningSquare([colIndex, rowIndex]) ? { color: `red` } : {}}
                            >
                                <Marker value={row} />
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