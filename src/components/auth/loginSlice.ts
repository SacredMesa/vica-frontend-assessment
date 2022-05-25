import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginDetailsType} from "./Login";
import {authenticate} from "../../services/LoginService";
import {RootState} from '../../app/store';

export interface LoginState {
  isAuthenticated: boolean;
  username: string;
  persona: string;
  status: 'idle' | 'loading' | 'failed'
}

const initialState: LoginState = {
  isAuthenticated: false,
  username: '',
  persona: '',
  status: 'idle'
}

export const verifyUser = createAsyncThunk(
  'login/verifyUser',
  async (payload: LoginDetailsType) => {
    return authenticate(payload);
  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    checkSession: (state) => {
      const user = sessionStorage.getItem('username')
      const persona = sessionStorage.getItem('persona')
      if (user && persona) {
       state.isAuthenticated = true
       state.username = user
       state.persona = persona
      }
    },
    signOut: (state) => {
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('persona')
      state.isAuthenticated = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.isAuthenticated = true
          state.username = action.payload.username
          state.persona = action.payload.persona
          sessionStorage.setItem('username', action.payload.username)
          sessionStorage.setItem('persona', action.payload.persona)
          return
        }
        alert('Wrong username or password')
      })
      .addCase(verifyUser.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const {checkSession, signOut} = loginSlice.actions

export default loginSlice.reducer

export const authenticatedState = (state: RootState) => state.login.isAuthenticated
export const authenticatedUser = (state: RootState) => state.login.username
export const authenticatedPersona = (state: RootState) => state.login.persona
