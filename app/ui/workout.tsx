'use client'

import { use, useEffect, useState } from "react"
import { exercise, exerciseData, workout } from "../lib/definitions"

import { ExpandMore } from '@mui/icons-material';
import { Card, CardContent, List, ListItem, ListItemText, Typography, Button, CardActions, CardHeader, Collapse, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";


export default function Workout({ data, exercises }: { data: workout, exercises: exerciseData[] | null }) {

    const dateRender = new Date(data.date).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ minHeight: 200 }}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography component="span">{data.name}-{dateRender}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Card variant="outlined" >
                    <CardHeader title={data.name} subheader={dateRender} sx={{ pb: 0 }} />
                    <CardContent sx={{ p: 0, pl: 2, overflow: 'scroll' }} >
                        <List dense={true} sx={{ p: 0, m: 0 }}>
                            {data.exercises.map((exerciseID: string, ndx: number) => {
                                let exerciseVal = exercises?.find(exercise => exercise.id === exerciseID);

                                return <ListItem key={ndx}>
                                    <ListItemText>{exerciseVal?.name}</ListItemText>
                                </ListItem>
                            })}
                        </List>
                    </CardContent>
                    <CardActions>
                        <Button type="button" size="small">Track Workout</Button>
                    </CardActions>
                </Card>
            </AccordionDetails>
        </Accordion>
    )

}