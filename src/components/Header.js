import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
    return (
        <AppBar position="sticky" style={{ backgroundColor: "#424242" }}>
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    NoPixel ES - Mazer minigame
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
