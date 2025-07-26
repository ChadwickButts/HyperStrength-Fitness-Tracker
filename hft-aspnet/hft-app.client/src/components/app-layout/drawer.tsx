import { Drawer, Toolbar, Typography, AppBar } from "@mui/material"
import DrawerNavLinks from "./drawer-nav-links"
const drawerWidth = 160;

export default function CustomDrawer() {
    return (<>
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
    </>
    )
}