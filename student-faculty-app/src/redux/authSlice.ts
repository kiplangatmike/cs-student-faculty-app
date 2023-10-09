import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface authState {
    user: { email: string | null }
    loading: boolean
    error: string | null
}

const isLocalStorageAvailable = (): boolean => {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    }
    catch (e) {
        return false;
    }
}

const getUserFromLocalStorage = (): {email: string | null} => {
    if (isLocalStorageAvailable()) {
        const userString = localStorage.getItem("user");
        if (userString) {
            return JSON.parse(userString);
        }
    }
    return {email: null};
}

const initialState: authState = {
    user: getUserFromLocalStorage(),
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;

        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setUser: (state, action: PayloadAction<{email: string | null}>) => {
            state.user = action.payload;
        }
    }
});