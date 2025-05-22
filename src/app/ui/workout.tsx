'use client'

import { use, useEffect, useState } from "react"
import { exercise, exerciseData, workout } from "../lib/definitions"
import { useQuery, gql } from "@apollo/client";

import { ExpandMore } from '@mui/icons-material';
import { Card, CardContent, List, ListItem, ListItemText, Typography, Button, CardActions, CardHeader, Collapse, Accordion, AccordionSummary, AccordionDetails, Box, cardHeaderClasses, IconButton, Divider } from "@mui/material";
import { Exercise, Workout } from "@/types";


export default function WorkoutCard({ wdata }: { wdata: Workout }) {

    const dateRender = new Date(parseInt(wdata.date, 10)).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const Get_Workouts_and_Exercises = gql`#graphql
        query Get_Workouts_and_Exercises($wid: String) {
            workout_exercises(workoutid: $wid) {
                workoutname
                workoutid
                exerciseid
                exercisename
            }
        }
    `;

    const { loading, error, data } = useQuery(Get_Workouts_and_Exercises, { 
        variables: { wid: wdata.workoutid }
    });

    return (
        <>
            {loading && <Card>Loading...</Card>}
            {!loading &&
                <Card>
                    <CardHeader title={wdata.workoutname} subheader={dateRender} sx={{ pb: 1 }} />
                    <Divider />
                    <CardContent sx={{ p: 0 }}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                            boxShadow: 'none',
                            border: 'none'
                        }}>
                            <AccordionSummary aria-controls={`${wdata.workoutid}-panel-content`} id={`${wdata.workoutid}-panel-header`}
                                expandIcon={<ExpandMore />}>
                                <Typography component='span' >{data.workout_exercises.length} Exercises</Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                {!loading && <List dense={true} sx={{ p: 0, m: 0 }}>
                                    {data.workout_exercises.map((exercise: Exercise, ndx: number) => {
                                        return <ListItem key={ndx} >
                                            <ListItemText>{exercise.exercisename}</ListItemText>
                                        </ListItem>
                                        
                                    })}
                                </List>
                                }
                            </AccordionDetails>
                        </Accordion>
                    </CardContent>
                    <CardActions sx={{ p: 0 }}>
                        {!wdata.tracked && <Button fullWidth variant="contained" color='primary' >
                            Track Workout
                        </Button>
                        }
                        {wdata.tracked && <Button fullWidth variant="contained" color='info' >
                            Review Workout
                        </Button>
                        }
                    </CardActions>
                </Card>
            }
        </>
    )

}