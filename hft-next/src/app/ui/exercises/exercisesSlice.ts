import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

export const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        addExercise: (state: any, payload: PayloadAction) => {
            state.value = [...state.value, payload];
        }
    }
})