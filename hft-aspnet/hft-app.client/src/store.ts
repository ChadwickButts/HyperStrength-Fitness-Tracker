
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './components/account/userslice';
import { tabSlice } from './components/app-layout/tabslice';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        activeTab: tabSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch