import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Paper, Alert, Slider, Snackbar, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MazerButton from './MazerButton';
import MyLinearProgress from './MyLinearProgress';
import SelectIconSet from './SelectIconSet';
const numRows = 6;
const numCols = 6;
const num2Win = 24;
const updateTime = 100;
const initialDelay = 1000;

function Mazer() {
    const [reset, setReset] = useState(false);
    const [numSolved, setNumSolved] = useState(0);
    const [numOptions, setNumOptions] = useState(numRows * numCols);
    const [maxTime, setMaxTime] = useState(45);
    const [timeLeft, setTimeLeft] = useState(maxTime * 1000 / updateTime);
    const [game, setGame] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [openSB, setOpenSB] = useState(false);
    const [gameOverSB, setGameOverSB] = useState(false);
    const [gameWinSB, setGameWinSB] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [iconSet, setIconSet] = React.useState('bananaTreeWolf');

    const newGrid = () => {
        const initGrid = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
                row.push({ isClickable: true, hidden: false });
            }
            initGrid.push(row);
        }
        return initGrid;
    };
    const [grid, setGrid] = useState(() => newGrid());

    const handleRestart = () => {
        setReset(true);
        if (intervalId) {
            clearInterval(intervalId);
        }
        setGrid(newGrid());
        setNumOptions(numRows * numCols);
        setNumSolved(0);
        setTimeLeft(maxTime * 1000 / updateTime);
        setGame(false);
        setGameOver(false);
        setGameOverSB(false);
        setGameWinSB(false);
        setOpenSB(false);
    };

    const handleButtonClick = (icon, rowIndex, colIndex, clicked) => {
        if (!gameOver) {
            const value = getGridForIcon(grid, icon, rowIndex, colIndex);
            if (clicked === 1) {
                setNumSolved(numSolved + 1);
                grid[rowIndex][colIndex].hidden = true;
            }
            setNumOptions(value.nOptions);
            console.log(value.nOptions + ", " + numOptions);
            setGrid(value.updatedGrid);
        }
    };

    const handleSliderChange = (event, newValue) => {
        setMaxTime(newValue);
        handleRestart();
    };

    useEffect(() => {
        // console.log("Game: " + game + ", GameOver: " + gameOver + ", GameOverSB: " + gameOverSB + ", GameWinSB: " + gameWinSB + ", OpenSB: " + openSB + ", Reset: " + reset);
        const delayStart = setTimeout(() => {
            const countdownInterval = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        setGame(false);
                        if(!gameOver){
                            setGameOver(true);
                            setGameOverSB(true);
                        }
                        clearInterval(countdownInterval);
                        // console.log("Timeout!")
                        return 0;
                    }
                });
            }, updateTime);
            if(!game && !gameOver){
                setGame(true);
                setOpenSB(true);
            }
            setIntervalId(countdownInterval)
            return () => clearInterval(countdownInterval);
        }, initialDelay);
        if (reset === true) {
            setReset(false);
        }
        if(numOptions === 0){
            setTimeLeft(0);
        }
        if (numSolved === num2Win) {
            clearInterval(intervalId);
            setGameWinSB(true);
        }
        return () => clearTimeout(delayStart);
    }, [game, gameOver, gameOverSB, gameWinSB, intervalId, maxTime, numOptions, numSolved, openSB, reset, timeLeft]);
    const progress = ((timeLeft * updateTime / 1000) / (maxTime)) * 100;

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "black", minHeight: "100vh" }}>
            <Box width="25%" marginBottom="20px">
                <Grid container spacing={1} alignItems="center" justifyContent="center">

                    <Grid xs={12} xsOffset={0}>
                        <Paper elevation={3} square={false} sx={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', padding: '1rem' }}>
                            <Typography variant='h2'>Minigame</Typography>
                            <Typography>This is a minigame where you can test your skills.</Typography>
                            <Typography>Time: {((timeLeft * updateTime / 1000)).toFixed(1)} </Typography>
                        </Paper>
                    </Grid>

                    <Grid xs={6} xsOffset={1}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Slider aria-label='Time' value={maxTime} step={1} min={45} max={75} valueLabelDisplay='on' onChange={handleSliderChange} />
                            <Typography sx={{ color: "white", marginLeft: "10px" }}>{maxTime}s</Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={5}>
                        <SelectIconSet iconSet={iconSet} onSelect={(s) => setIconSet(s)} />
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="h6" color={"white"} align='center'>{numSolved}/{num2Win}</Typography>
                    </Grid>
                    {grid.map((row, rowIndex) => (
                        row.map((_, colIndex) =>
                            <Grid key={`${rowIndex}-${colIndex}`} xs={2}>
                                <MazerButton
                                    reset={reset}
                                    onClicked={(icon, clicks) => handleButtonClick(icon, rowIndex, colIndex, clicks)}
                                    isClickable={grid[rowIndex][colIndex].isClickable && !gameOver && game}
                                    error={(numOptions === 0) || gameOver}
                                    iconSet={iconSet}
                                />
                            </Grid>
                        )
                    ))}
                    <Grid xs={12} style={{ padding: "10px" }}>
                        <MyLinearProgress value={progress} />
                    </Grid>
                    <Grid xs={4} xsOffset={2} >
                        <Button variant="contained" onClick={handleRestart} sx={{ backgroundColor: '#3f675f', '&:hover': { backgroundColor: '#064034' } }}>Restart</Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={openSB} autoHideDuration={initialDelay} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setOpenSB(false)} >
                <Alert severity="info" variant='filled' sx={{ backgroundColor: '#3f675f' }}>The game starts NOW!</Alert>
            </Snackbar>
            <Snackbar open={gameOverSB} autoHideDuration={initialDelay} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setGameOverSB(false)} >
                <Alert severity="info" variant='filled' sx={{ backgroundColor: '#3f675f' }}>Game Over!</Alert>
            </Snackbar>
            <Snackbar open={gameWinSB} autoHideDuration={initialDelay} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => setGameWinSB(false)} >
                <Alert severity="info" variant='filled' sx={{ backgroundColor: '#3f675f' }}>You win!</Alert>
            </Snackbar>
        </div>
    );
}

function getGridFor8Close(grid, rowIndex, colIndex) {
    let numOptions = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!grid[i][j].hidden) {
                if (Math.abs(rowIndex - i) <= 1 && Math.abs(colIndex - j) <= 1 &&
                    (i !== rowIndex || j !== colIndex)) {
                    grid[i][j].isClickable = true;
                    numOptions++;
                } else {
                    grid[i][j].isClickable = false;
                }
            }
        }
    }
    return { updatedGrid: grid, nOptions: numOptions };
}

function getGridFor8Far(grid, rowIndex, colIndex) {
    let numOptions = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!grid[i][j].hidden) {
                if ((i === rowIndex || i === (rowIndex - 2) || i === (rowIndex + 2)) &&
                    (j === colIndex || j === (colIndex - 2) || j === (colIndex + 2)) &&
                    (i !== rowIndex || j !== colIndex)) {
                    grid[i][j].isClickable = true;
                    numOptions++;
                } else {
                    grid[i][j].isClickable = false;
                }
            }
        }
    }
    return { updatedGrid: grid, nOptions: numOptions };
}

function getGridFor3Far(grid, rowIndex, colIndex) {
    let numOptions = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!grid[i][j].hidden) {
                if ((rowIndex === i || rowIndex === (i - 3) || rowIndex === (i + 3)) &&
                    (colIndex === j || colIndex === (j - 3) || colIndex === (j + 3)) &&
                    (i !== rowIndex || j !== colIndex)) {
                    grid[i][j].isClickable = true;
                    numOptions++;
                } else {
                    grid[i][j].isClickable = false;
                }
            }
        }
    }
    return { updatedGrid: grid, nOptions: numOptions };
}

function getGridForIcon(grid, iconStep, rowIndex, colIndex) {
    // console.log(icon + ", " + rowIndex + "," + colIndex + "," + numOptions);
    if (iconStep === '8close') {
        return getGridFor8Close(grid, rowIndex, colIndex);
    } else if (iconStep === '8far') {
        return getGridFor8Far(grid, rowIndex, colIndex);
    } else if (iconStep === '3far') {
        return getGridFor3Far(grid, rowIndex, colIndex);
    }
}

export default Mazer;


//TODO:
//Best time
//Best strike