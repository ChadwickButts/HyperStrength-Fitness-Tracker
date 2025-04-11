'use client'

import { use, useEffect, useState } from "react"
import { exercise, exerciseData, workout } from "../lib/definitions"


import { Card, CardContent, List, ListItem, ListItemText, Typography, Button, CardActions, CardHeader, Collapse } from "@mui/material";


export default function Workout({ data, exercises }: { data: workout, exercises: exerciseData[] | null }) {

    const dateRender = new Date(data.date).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Card variant="outlined" >
            <CardHeader title={data.name} subheader={dateRender} />
            <CardContent sx={{ p: 0, pl: 2 }}>
                <List dense={true} sx={{ p: 0, m: 0 }}>
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
    )

}