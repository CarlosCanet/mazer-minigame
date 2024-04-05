import React, { useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import MazerButton from './MazerButton';

function Mazer() {
    const numRows = 6;
    const numCols = 6;
    const [grid, setGrid] = useState(Array(numRows).fill(Array(numCols).fill([])));

    // Function to handle restart button click
    const handleRestart = () => {
        setGrid(Array(6).fill(Array(6).fill([])));
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "black", minHeight: "100vh" }}>
            <Box width="35%" marginBottom="20px">
                <Grid container spacing={1}>
                    {grid.map((row, rowIndex) => (
                        row.map((col, colIndex) =>
                            <Grid key={`${rowIndex}-${colIndex}`} item xs={2}>
                                <MazerButton onReset={handleRestart} />
                            </Grid>
                        )
                    ))}
                </Grid>
            </Box>
            <Button variant="contained" onClick={handleRestart}>Restart</Button>
        </div>
    );
}

export default Mazer;
