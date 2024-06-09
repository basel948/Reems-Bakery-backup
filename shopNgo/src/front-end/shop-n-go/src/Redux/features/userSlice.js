import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await axios.get('http://localhost:8080/api/auth/users');
    console.log(response.data);
    return response.data;
});

// Async thunk to login a user
export const loginUser = createAsyncThunk('user/loginUser', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', user);
        const token = response.data.token;
        const tokenType = response.data.type;
        localStorage.setItem('jwtToken', token);
        console.log(response.data);
        console.log(token);
        const userResponse = await axios.get('http://localhost:8080/api/auth/users/currentUser', {
            headers: {
                Authorization: `${tokenType} ${token}`
            }
        });
        console.log(userResponse.data);
        return userResponse.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Create a slice for user state management
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        userData: null,
        token: localStorage.getItem('jwtToken') || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userData = null;
            state.token = null;
            localStorage.removeItem('jwtToken');
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
                state.token = localStorage.getItem('jwtToken');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout, setUserData } = userSlice.actions;

export default userSlice.reducer;
