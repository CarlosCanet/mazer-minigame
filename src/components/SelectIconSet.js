import React from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    // components: {
    //     MuiSelect: {
    //         styleOverrides: {
    //             root: {
    //                 fontSize: "0.7rem",
    //             }
    //         }
    //     },
    //     MuiMenuItem: {
    //         styleOverrides: {
    //             root: {
    //                 fontSize: "0.7rem"
    //             }
    //         }
    //     }
    // }
    // palette: {
    //     type: 'dark',
    //     primary: {
    //         main: '#90caf9',
    //     },
    //     secondary: {
    //         main: '#f48fb1',
    //     },
    // },
    // components: {
    //     MuiSelect: {
    //         styleOverrides: {
    //             root: {
    //                 color: "white",
    //                 fontSize: "0.75rem",
    //             },
    //             icon: {
    //                 color: "white"
    //             }
    //         }
    //     },
    //     MuiInputLabel: {
    //         styleOverrides: {
    //             root: {
    //                 color: "white",
    //                 '&.Mui-focused': {
    //                     color: "green"
    //                 }
    //             },
    //         }
    //     },
    //     MuiOutlinedInput: {
    //         styleOverrides: {
    //             root: {
    //                 '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //                     borderColor: "white"
    //                 },
    //                 '&:hover .MuiOutlinedInput-notchedOutline': {
    //                     borderColor: "lightgreen"
    //                 },
    //                 '&:hover + .MuiInputLabel-root': {
    //                     color: "red"
    //                 }
    //             },
    //             notchedOutline: {
    //                 borderColor: "white"
    //             }
    //         }
    //     },
    //     MuiMenu: {
    //         styleOverrides: {
    //             paper: {
    //                 backgroundColor: "darkgrey",
    //                 // color: "white",
    //                 fontSize: "0.2rem"
    //             }
    //         }
    //     },
    //     MuiMenuItem: {
    //         styleOverrides: {
    //             root: {
    //                 fontSize: "0.75rem"
    //             }
    //         }
    //     }
    // }
});

const SelectIconSet = ({ iconSet, onSelect }) => {

    return (
        <ThemeProvider theme={darkTheme}>
            <FormControl sx={{ minWidth: "100%", marginTop: '10px' }}>
                <InputLabel id="icons-set-label" sx={{ fontSize: '0.75rem', top:'3.5px'}}>Iconos</InputLabel>
                <Select
                    labelId="icons-set-label"
                    id="icons-set-select"
                    value={iconSet}
                    label="Iconos"
                    onChange={(e) => onSelect(e.target.value)}
                    sx={{ fontSize: '0.75rem'}}
                >
                    <MenuItem value="bananaTreeWolf">Bananas, Trees and Wolves</MenuItem>
                    <MenuItem value="mouseBirdFrog">Mouses, Birds and Frogs</MenuItem>
                    <MenuItem value="pawBearMonkey">Paws, Bears and Monkeys</MenuItem>
                </Select>
            </FormControl>
        </ThemeProvider>
    );
}

export default SelectIconSet;