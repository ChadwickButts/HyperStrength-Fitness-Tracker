import React from 'react';

import DatePickerLocalization from "./DatePickerLocalization"
import { store } from "./store"
import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material"
import { Provider } from "react-redux"
import CustomDrawer from "./components/app-layout/drawer"
import Dashboard from "./components/dashboard/Dashboard"
import theme from "./theme"

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    <Box sx={{ display: 'flex' }}>
                        <CustomDrawer />
                        <Box component="main" sx={{
                            flexGrow: 1
                        }}>
                            <Toolbar variant="dense" />
                            <DatePickerLocalization>
                                <Dashboard />
                            </DatePickerLocalization>
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;