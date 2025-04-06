'use client'

import { use, useEffect, useState } from "react"
import { exercise, exerciseData, workout } from "../lib/definitions"


import { Card, CardContent, List, ListItem, ListItemText, Typography, Button, CardActions, CardHeader, Collapse } from "@mui/material";


export default function Workout({ data, exercises }: { data: workout, exercises: Promise<any[] | null> }) {

    const dateRender = new Date(data.date).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return <Card variant="outlined" sx={{ minWidth: 275, minHeight: 375 }}>
        <CardHeader title={data.name} subheader={dateRender} />
        <CardContent>
            <List dense={true}>
                {data.exercises.map((exerciseID: string, ndx: number) => {
                    
                    return <ListItem key={ndx}>
                        <ListItemText>{exerciseID}</ListItemText>
                    </ListItem>
                })}
            </List>
        </CardContent>
        <CardActions>
            <Button type="button" size="small">Track Workout</Button>
        </CardActions>
    </Card>

}