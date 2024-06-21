import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMenuItems = createAsyncThunk('menuItems/fetchMenuItems', async () => {
    const response = await axios.get('http://localhost:8080/api/auth/menuItems');
    console.log(response.data);
    return response.data;
});

const menuItemsSlice = createSlice({
    name: 'menuItems',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMenuItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchMenuItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default menuItemsSlice.reducer;
