'use client'

import { List, ListItem, ListItemButton } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function DrawerNavLinks() {

    const pathname = usePathname();

    const links = [
        { linkId: 'dashboard', href: '/', name: 'Dashboard' },
        { linkId: 'exercises', href: '/exercises', name: 'Exercise Library' }
    ]

    return (
        <>
            <List component="nav" aria-label="dashboard nav links">
                {links.map(link => {
                    return (
                        <ListItem disablePadding key={link.linkId}>
                            <ListItemButton selected={pathname === link.href}>
                                <Link
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}