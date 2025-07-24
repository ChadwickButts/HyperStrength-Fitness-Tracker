'use client'

import DatePickerLocalization from "@/app/datepicker_localization"
import { store } from "@/app/store"
import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material"
import { Provider } from "react-redux"
import CustomDrawer from "./drawer"
import { ApolloWrapper } from "@/app/apollowrapper"
import theme from "@/app/theme"

export default function Wrappers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloWrapper>
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
                                <Provider store={store}>
                                    {children}
                                </Provider>
                            </DatePickerLocalization>
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </ApolloWrapper>
    )
}