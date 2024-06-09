import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Import necessary functions from Redux Toolkit
import axios from 'axios'; // Import axios for making HTTP requests

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await axios.get('http://localhost:8080/api/auth/users'); // Make GET request to fetch all users
    console.log(response.data);
    return response.data; // Return the fetched users data
});

// Async thunk to login a user
export const loginUser = createAsyncThunk('user/loginUser', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', user); // Make POST request to sign in
        const token = response.data.token; // Extract the token from the response
        const tokenType = response.data.type; // Extract the token type from the response
        localStorage.setItem('jwtToken', token); // Store the token in localStorage
        console.log(response.data);
        console.log(token);
        const userResponse = await axios.get(`http://localhost:8080/api/auth/users/currentUser`, {
            headers: {
                Authorization: `${tokenType} ${token}` // Set the Authorization header with the token
            }
        });
        console.log(userResponse.data);
        return userResponse.data; // Return the fetched user data
    } catch (error) {
        return rejectWithValue(error.response.data); // Handle error by rejecting with the error message
    }
});

// Create a slice for user state management
const userSlice = createSlice({
    name: 'user', // Name of the slice
    initialState: {
        users: [], // Array to store all users
        userData: null, // Object to store the logged-in user's data
        token: localStorage.getItem('jwtToken') || null, // Token for authentication, retrieved from localStorage
        status: 'idle', // Status of the async actions
        error: null, // Error message if any
    },
    reducers: {
        logout: (state) => {
            state.userData = null; // Clear user data on logout
            state.token = null; // Clear the token on logout
            localStorage.removeItem('jwtToken'); // Remove the token from localStorage
        },
        setUserData: (state, action) => {
            state.userData = action.payload; // Set user data manually
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.status = 'loading'; // Set status to loading when fetching users
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded when fetching is successful
                state.users = action.payload; // Store the fetched users in state
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed when fetching fails
                state.error = action.error.message; // Store the error message in state
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'; // Set status to loading when logging in
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded when login is successful
                state.userData = action.payload; // Store the logged-in user's data in state
                state.token = localStorage.getItem('jwtToken'); // Retrieve the token from localStorage
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed when login fails
                state.error = action.payload || action.error.message; // Store the error message in state
            });
    },
});

// Export actions and reducer
export const { logout, setUserData } = userSlice.actions;

export default userSlice.reducer;
