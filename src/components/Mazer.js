import React, { useEffect, useState } from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import MazerButton from './MazerButton';
const numRows = 6;
const numCols = 6;

function Mazer() {
    const [reset, setReset] = useState(false);
    const [numSolved, setNumSolved] = useState(0);
    const [numOptions, setNumOptions] = useState(numRows*numCols);
    const newGrid = () => {
        const initGrid = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
                row.push({ isClickable: true });
            }
            initGrid.push(row);
        }
        return initGrid;
    };
    const [grid, setGrid] = useState(() => newGrid());

    const handleRestart = () => {
        setReset(true);
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++){
                grid[i][j].isClickable = true;
            }   
        }
        setNumOptions(numRows*numCols);
    };

    const handleButtonClick = (icon, rowIndex, colIndex) => {
        // console.log(rowIndex + "." + colIndex);
        const value = getGridForIcon(icon, rowIndex, colIndex);
        setNumOptions(value.nO);
        console.log(value.nO + "," + numOptions);
        setGrid(value.updatedGrid);
    };

    useEffect(() => {
        if (reset === true) {
            setReset(false);
        }
    }, [reset]);

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "black", minHeight: "100vh" }}>
            <Box width="35%" marginBottom="20px">
                <Typography variant="h6" color={"white"} align='center'>{numSolved}/24</Typography>
                <Grid container spacing={1}>
                    {grid.map((row, rowIndex) => (
                        row.map((_, colIndex) =>
                            <Grid key={`${rowIndex}-${colIndex}`} item xs={2}>
                                <MazerButton reset={reset} onClicked={(icon) => handleButtonClick(icon, rowIndex, colIndex)} isClickable={grid[rowIndex][colIndex].isClickable} onHidden={() => {setNumSolved(numSolved+1)}} error={numOptions===0}/>
                            </Grid>
                        )
                    ))}
                </Grid>
            </Box>
            <Button variant="contained" onClick={handleRestart}>Restart</Button>
        </div>
    );
}

function getGridFor8Close(rowIndex, colIndex, numOptions) {
    const initGrid = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            if (Math.abs(rowIndex - i) <= 1 && Math.abs(colIndex - j) <= 1 && 
                ( i !== rowIndex || j !== colIndex)){
                row.push({ isClickable: true });
                numOptions++;
            } else {
                row.push({ isClickable: false });
            }
        }
        initGrid.push(row);
    }
    return { updatedGrid: initGrid, nO: numOptions };
}

function getGridFor8Far(rowIndex, colIndex, numOptions) {
    const initGrid = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            if ((i === rowIndex || i === (rowIndex - 2) || i === (rowIndex + 2)) && 
                (j === colIndex || j === (colIndex - 2) || j === (colIndex + 2)) && 
                ( i !== rowIndex || j !== colIndex)){
                row.push({ isClickable: true });
                numOptions++;
            } else {
                row.push({ isClickable: false });
            }
        }
        initGrid.push(row);
    }
    return { updatedGrid: initGrid, nO: numOptions };
}

function getGridFor3Far(rowIndex, colIndex, numOptions) {
    const initGrid = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            if ((rowIndex === i || rowIndex === (i - 3) || rowIndex === (i + 3)) && 
                (colIndex === j || colIndex === (j - 3) || colIndex === (j + 3)) && 
                ( i !== rowIndex || j !== colIndex)){
                row.push({ isClickable: true });
                numOptions++;
            } else {
                row.push({ isClickable: false });
            }
        }
        initGrid.push(row);
    }
    return { updatedGrid: initGrid, nO: numOptions };
}

function getGridForIcon(icon, rowIndex, colIndex) {
    let numOptions = 0; 
    // console.log(icon + ", " + rowIndex + "," + colIndex + "," + numOptions);
    if (icon === '8close') {
        return getGridFor8Close(rowIndex, colIndex, numOptions);
    } else if (icon === '8far') {
        return getGridFor8Far(rowIndex, colIndex, numOptions);
    } else if (icon === '3far') {
        return getGridFor3Far(rowIndex, colIndex, numOptions);
    }
}

export default Mazer;
