import { LinearProgress, ThemeProvider, createTheme } from "@mui/material";
import React from "react";



const theme = createTheme({
    palette: {
        primary: {
            main: '#fb4718',
        },
    }
});

function MyLinearProgress({ value }) {
    return (
        <ThemeProvider theme={theme}>
            <LinearProgress variant='determinate' value={value} color='primary' sx={{backgroundColor:'transparent'}}/>
        </ThemeProvider>
    );
}
export default MyLinearProgress;