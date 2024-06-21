// src/Redux/alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        open: false,
        message: '',
        severity: 'info',
    },
    reducers: {
        showAlert: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hideAlert: (state) => {
            state.open = false;
            state.message = '';
            state.severity = 'info';
        },
    },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
