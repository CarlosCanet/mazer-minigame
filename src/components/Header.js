import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
    return (
        <AppBar position="sticky" style={{ backgroundColor: "#424242" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    NoPixel ES - Thermite minigame
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
