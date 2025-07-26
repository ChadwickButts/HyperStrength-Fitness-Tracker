import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateActiveTab } from "./tabslice";
function DrawerNavLinks() {

    const selectedTab = useSelector((state: RootState) => state.activeTab);
    const dispatch = useDispatch();

    const links = [
        { linkId: 'dashboard', href: '/', name: 'Dashboard' },
        { linkId: 'exercises', href: '/exercises', name: 'Exercise Library' }
    ]

    return (
        <List component="nav" aria-label="dashboard nav links">
            {links.map(link => {
                return (
                    <ListItem disablePadding key={link.linkId}>
                        <ListItemButton
                            selected={link.linkId === selectedTab}
                            onClick={() => { dispatch(updateActiveTab(link.linkId)) }}
                        >
                            <ListItemText primary={link.name}/>
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    );
}

export default DrawerNavLinks;