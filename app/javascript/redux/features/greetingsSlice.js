import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState =  {
    loading: false,
    message: null,
    error: "",
}

export const fetchMessage = createAsyncThunk('message/fetchMessage', async () => {
    try {
        const response = await fetch('/greetings/random');
        const data =  await response.json();
        return data.greeting;
    } catch (error) {
        throw new Error('Failed to fetch Greeting');
    }
})

const greetingSlice = createSlice({
    name: 'greeting',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchMessage.fulfilled, (state, action) =>{
            state.message = action.payload;
        });
        builder.addCase(fetchMessage.rejected, (state, action) => {
            state.message = "";
            state.error = action.error.message;
        });
    },
});

export default greetingSlice.reducer;