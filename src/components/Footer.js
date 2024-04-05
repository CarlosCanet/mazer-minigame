import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Footer() {
    return (
        <AppBar position="sticky" style={{ top: 'auto', bottom: 0, backgroundColor: "#424242"}}>
            <Toolbar>
                <Typography variant="h8" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Coded by CarlosC
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
