import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name:'book',
    initialState:{
        bookData:[]
    },
    reducers:{
        search:(state,action:PayloadAction<string>) => {
            console.log(action.payload,state);
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(
            fetchDataAsync.rejected,
            (state) => {
                console.log('Rejected',state)
            }
            )
        .addCase(
            fetchDataAsync.pending,
            (state) => {
                console.log('pending',state);
            }
        )
        .addCase(
            fetchDataAsync.fulfilled,
            (state,action:PayloadAction<string>) => {
                console.log('fulfilled',state);
                state.bookData = action.payload;
            }
            )
    }
});

export const fetchDataAsync = createAsyncThunk(
    'book/fetchDataAsync',
    async (name) => {
        // await new Promise((resolve) => setTimeout(resolve,1000));
        let dataRaw = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`)
        let data = await dataRaw.json();
        return data.items;
    }
);

export const { search } = bookSlice.actions;

export default bookSlice.reducer;