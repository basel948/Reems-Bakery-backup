import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await axios.get('http://localhost:8080/api/auth/users');
    return response.data;
});

// Async thunk to fetch the current user
export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        const response = await axios.get('http://localhost:8080/api/auth/users/currentUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    throw new Error('No token found');
});

// Async thunk to login a user
export const loginUser = createAsyncThunk('user/loginUser', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', user);
        const token = response.data.token;
        const tokenType = response.data.type;
        localStorage.setItem('jwtToken', token);
        const userResponse = await axios.get('http://localhost:8080/api/auth/users/currentUser', {
            headers: {
                Authorization: `${tokenType} ${token}`
            }
        });
        return userResponse.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk to update user information
export const updateUser = createAsyncThunk('user/updateUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/auth/users/${userData.id}`, userData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk to change password
export const changePassword = createAsyncThunk('user/changePassword', async ({ passwordData, token }, { rejectWithValue }) => {
    try {
        const response = await axios.put('http://localhost:8080/api/auth/users/changePassword', passwordData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk to create a new location
export const createLocation = createAsyncThunk(
    'user/createLocation',
    async ({ userId, locationData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post(
                `http://localhost:8080/api/auth/users/location/${userId}`,
                locationData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update a location
export const updateLocation = createAsyncThunk(
    'user/updateLocation',
    async ({ userId, index, locationData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.put(
                `http://localhost:8080/api/auth/users/location/${userId}?index=${index}`,
                locationData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a location
export const deleteLocation = createAsyncThunk(
    'user/deleteLocation',
    async ({ userId, index }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.delete(
                `http://localhost:8080/api/auth/users/location/${userId}?index=${index}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// Async thunk to initialize user state
export const initializeUser = createAsyncThunk('user/initializeUser', async (_, { dispatch }) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        await dispatch(fetchCurrentUser());
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
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(initializeUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(initializeUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(initializeUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(changePassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(createLocation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createLocation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData.locations.push(action.payload);
            })
            .addCase(createLocation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(updateLocation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateLocation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData.locations[action.meta.arg.index] = action.payload;
            })
            .addCase(updateLocation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(deleteLocation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteLocation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData.locations.splice(action.meta.arg.index, 1);
            })
            .addCase(deleteLocation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout, setUserData } = userSlice.actions;

export default userSlice.reducer;
