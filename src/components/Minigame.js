import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

function Minigame() {
    const [timeLeft, setTimeLeft] = useState(1000);
    const [bestTime, setBestTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    
    
    useEffect(() => {
        const delayStart = setTimeout(() => {
            const countdownInterval = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime > 0) {
                        return prevTime - 1;
                    } else {
                        setGameOver(true);
                        clearInterval(countdownInterval);
                        return 0;
                    }
                });
            }, 100);
    
            return () => clearInterval(countdownInterval);
        }, 3000);
        return () => clearTimeout(delayStart);
    }, [timeLeft]);

    return (
        <div>
            <Grid container spacing={2} alignContent='center' padding='1rem'>
                <Grid xs={4} xsOffset={4}>
                    <Paper elevation={3} square={false} sx={{ textAlign: 'center', backgroundColor: 'gray', color: 'white', padding: '1rem' }}>
                        <Typography variant='h2'>Minigame</Typography>
                        <Typography>This is a minigame where you can test your skills.</Typography>
                        <Typography>Time: {(timeLeft/10).toFixed(1)} </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
};

export default Minigame;