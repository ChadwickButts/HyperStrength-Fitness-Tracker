import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./app.css";
import DatePickerLocalization from "./datepicker_localization";
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, Tab, Tabs, ThemeProvider, Toolbar, Typography } from "@mui/material";
import theme from "./theme";
import DrawerNavLinks from "./ui/drawer-nav-links";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  title: "HyperStrength Fitness Tracker",
  description: "Generated by create next app",
};

const drawerWidth = 160;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" anchor="left"
              sx={{
                zIndex: 1,
                width: drawerWidth,
                flexShrink: 0
              }}>
              <Toolbar variant="dense" >
                <Typography variant="h6" component="span">
                  HyperStrength
                </Typography>
              </Toolbar>
              <Divider />
              <DrawerNavLinks />
            </Drawer>
            <Box component="main" sx={{
              flexGrow: 1
            }}>
              <DatePickerLocalization>
                {children}
              </DatePickerLocalization>
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
