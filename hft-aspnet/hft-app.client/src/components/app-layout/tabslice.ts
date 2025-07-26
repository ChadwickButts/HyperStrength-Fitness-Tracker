import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: String = "dashboard"

export const tabSlice = createSlice({
    name: 'activeTab',
    initialState,
    reducers: {
        updateActiveTab: (state: String, action: PayloadAction<String>) => action.payload,
    }
})

export const { updateActiveTab } = tabSlice.actions;
export default tabSlice.reducer;