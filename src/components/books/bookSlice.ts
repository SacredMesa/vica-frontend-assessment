import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface BookState {
  borrowedBooks: any[]
}

const initialState: BookState = {
  borrowedBooks: []
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    borrowBook: (state, action) => {
      state.borrowedBooks = [...state.borrowedBooks, action.payload]
      return
    },
    returnBook: (state, action) => {
      const updatedArr = [...state.borrowedBooks]
      updatedArr.splice(state.borrowedBooks.indexOf(action.payload), 1)
      state.borrowedBooks = [...updatedArr]
      return
    }
  }
})

export const {borrowBook, returnBook} = bookSlice.actions
export default bookSlice.reducer

export const borrowedBooks = (state: RootState) => state.books.borrowedBooks
