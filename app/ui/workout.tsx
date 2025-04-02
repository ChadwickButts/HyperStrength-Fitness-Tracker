'use client'

import { useState } from "react"
import { exerciseData, workout } from "../lib/definitions"


import { Card, CardContent, Typography, Button } from "@mui/material";


export default function Workout(props: { data: workout }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleShowDetailsClick = () => {
        setShowDetails(!showDetails);
    }

    const dateRender = new Date(props.data.date).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return <Card sx={{ minWidth: 275 }}>
        <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Date Scheduled: {dateRender}
        </Typography>
        <Typography variant="h4" component="div">
            {props.data.name}
        </Typography>
        {!showDetails ?
            <Button type="button" onClick={handleShowDetailsClick}>show details</Button>
            : <Button type="button" onClick={handleShowDetailsClick}>hide details</Button>
        }
        <Button type="button">Track Workout</Button>

        {showDetails && <>
            <ul>
                {props.data.exercises.map((exercise: exerciseData, ndx: number) => {
                    return <li key={ndx}>{exercise.name}</li>
                })}
            </ul>
        </>}
        </CardContent>
    </Card>

}