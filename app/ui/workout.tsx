'use client'

import { useState } from "react"
import { exerciseData, workout } from "../lib/definitions"


import { Card, CardContent, List, ListItem, ListItemText, Typography, Button, CardActions, CardHeader, Collapse } from "@mui/material";


export default function Workout(props: { data: workout }) {

    const dateRender = new Date(props.data.date).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return <Card variant="outlined" sx={{ minWidth: 275, minHeight: 375}}>
        <CardHeader title={props.data.name} subheader={dateRender} />
        <CardContent>
            <List dense={true}>
                {props.data.exercises.map((exercise: exerciseData, ndx: number) => {
                    return <ListItem key={ndx}>
                        <ListItemText>{exercise.name}</ListItemText>
                    </ListItem>
                })}
            </List>
        </CardContent>
        <CardActions>
            <Button type="button" size="small">Track Workout</Button>
        </CardActions>
    </Card>

}