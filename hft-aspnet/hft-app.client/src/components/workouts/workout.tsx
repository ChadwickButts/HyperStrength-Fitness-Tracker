
import { use, useEffect, useState } from "react";
import { exercise, exerciseData, workout, workoutExerciseDetails } from "../../lib/types";
import { ExpandMore } from '@mui/icons-material';
import {
    Card, CardContent, List, ListItem, ListItemText, Typography,
    Button, CardActions, CardHeader, Collapse, Accordion, AccordionSummary,
    AccordionDetails, Box, cardHeaderClasses, IconButton, Divider
} from "@mui/material";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getWorkoutExerciseDetails, getExercises, getExercisesByIds } from "../../lib/query";

function WorkoutCard({ wdata }: { wdata: workout }) {

    const [expanded, setExpanded] = useState<string | false>(false);
    const { data: workoutExerciseDetailsQ, isPending }= useQuery({
        queryKey: ['workout_exercise_details', wdata.workoutid],
        queryFn: () => getWorkoutExerciseDetails(wdata.workoutid)
    });

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const dateRender = new Date(parseInt(wdata.date, 10)).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const loading = true;

    return (
        <>
            <Card>
                <CardHeader title={wdata.workoutname} subheader={dateRender} sx={{ pb: 1 }} />
                <Divider />
                <CardContent sx={{ p: 0 }}>
                    {!isPending &&
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                            boxShadow: 'none',
                            border: 'none'
                        }}>
                            <AccordionSummary aria-controls={`${wdata.workoutid}-panel-content`} id={`${wdata.workoutid}-panel-header`}
                                expandIcon={<ExpandMore />}>
                                <Typography component='span' >{workoutExerciseDetailsQ.length} Exercises</Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <List dense={true} sx={{ p: 0, m: 0 }}>
                                    {workoutExerciseDetailsQ.map((exercise: workoutExerciseDetails, ndx: number) => {
                                        return <ListItem key={ndx} >
                                            <ListItemText>{exercise.exercisename}</ListItemText>
                                        </ListItem>
                                    })}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    }
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
        </>
    );
}

export default WorkoutCard;