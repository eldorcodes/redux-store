import { configureStore } from "@reduxjs/toolkit";
import Counter from "./Counter";
import Book from "./Book";

export const Store = configureStore({
    reducer:{
        count:Counter,
        book:Book
    }
});

Store.subscribe(() => console.log('Store state',Store.getState()));
