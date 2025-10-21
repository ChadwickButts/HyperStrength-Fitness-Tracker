import { createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface UserState {
    userid: number,
    email: string,
    name: string
}

const initialState: UserState = {
    userid: 0,
    email: 'anon',
    name: 'Anon User'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateCurrentUser: (state: UserState, action: PayloadAction<UserState>) => action.payload,
    }
})

export const { updateCurrentUser } = userSlice.actions;
export default userSlice.reducer;