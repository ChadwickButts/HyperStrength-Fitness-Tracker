'use client'

import { List, ListItem, ListItemButton } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DrawerNavLinks() {

    const pathname = usePathname();

    const links = [
        { href: '/', name: 'Dashboard' },
        { href: '/exercises', name: 'Exercise Library' }
    ]

    return (
        <>
            <List>
                {links.map(link => {
                    return (
                        <ListItem disablePadding key={link.name}>
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