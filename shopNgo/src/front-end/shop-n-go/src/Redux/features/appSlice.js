// src/Redux/features/appSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    translationInProgress: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTranslationInProgress: (state, action) => {
            state.translationInProgress = action.payload;
        },
    },
});

export const { setTranslationInProgress } = appSlice.actions;

export default appSlice.reducer;
