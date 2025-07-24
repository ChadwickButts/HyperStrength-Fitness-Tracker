import React from 'react';

import { useEffect, useState } from 'react';
import { Box, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import DatePickerLocalization from "./DatePickerLocalization";
import './App.css';
import Dashboard from "./components/dashboard/Dashboard"
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Toolbar variant="dense" />
                    <DatePickerLocalization>
                        <Dashboard />
                    </DatePickerLocalization>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;