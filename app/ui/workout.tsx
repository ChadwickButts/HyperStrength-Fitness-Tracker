'use client'

import { use, useEffect, useState } from "react"
import { exercise, exerciseData, workout } from "../lib/definitions"

import { ExpandMore } from '@mui/icons-material';
import { Card, CardContent, List, ListItem, ListItemText, Typography, Button, CardActions, CardHeader, Collapse, Accordion, AccordionSummary, AccordionDetails, Box, cardHeaderClasses, IconButton, Divider } from "@mui/material";


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
        <Card>
            <CardHeader title={data.name} subheader={dateRender} sx={{ pb: 1 }} />
            <Divider />
            <CardContent sx={{ p: 0 }}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                    boxShadow: 'none',
                    border: 'none'
                }}>
                    <AccordionSummary aria-controls={`${data.id}-panel-content`} id={`${data.id}-panel-header`}
                        expandIcon={<ExpandMore />}>
                        <Typography component='span' >{data.exercises.length} Exercises</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                        <List dense={true} sx={{ p: 0, m: 0 }}>
                            {data.exercises.map((exerciseID: string, ndx: number) => {
                                let exerciseVal = exercises?.find(exercise => exercise.id === exerciseID);

                                return <ListItem key={ndx} >
                                    <ListItemText>{exerciseVal?.name}</ListItemText>
                                </ListItem>
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
            <CardActions sx={{ p: 0 }}>
                { !data.tracked && <Button fullWidth variant="contained" color='primary' >
                    Track Workout
                </Button>
                }
                { data.tracked && <Button fullWidth variant="contained" color='info' >
                    Review Workout
                </Button>
                }
            </CardActions>
        </Card>
    )

}