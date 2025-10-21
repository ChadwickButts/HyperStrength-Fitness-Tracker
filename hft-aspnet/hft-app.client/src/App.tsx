import React from 'react';

import DatePickerLocalization from "./DatePickerLocalization"
import { store } from "./store"
import { AppBar, Box, CssBaseline, Drawer, ThemeProvider, Toolbar, Typography } from "@mui/material"
import { Provider } from "react-redux"
import Dashboard from "./components/dashboard/Dashboard"
import theme from "./theme"
import DrawerNavLinks from './components/app-layout/drawer-nav-links';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
    const drawerWidth = 160;
    const queryClient = new QueryClient();


    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    <Box sx={{ display: 'flex' }}>
                        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                            <Toolbar variant="dense">
                                <Typography variant="h6" component="span">
                                    HyperStrength
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" anchor="left"
                            sx={{
                                zIndex: 1,
                                width: drawerWidth,
                                flexShrink: 0,
                                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                            }}>
                            <Toolbar variant="dense" />
                            <DrawerNavLinks />
                        </Drawer>
                        <Box component="main" sx={{
                            flexGrow: 1
                        }}>
                            <Toolbar variant="dense" />
                            <DatePickerLocalization>
                                <QueryClientProvider client={queryClient}>
                                    <Dashboard />
                                </QueryClientProvider>
                            </DatePickerLocalization>
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;