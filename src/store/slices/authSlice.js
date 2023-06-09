import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth/login";

const emptyState = {
  id: "",
  token: "",
  fullName: "",
  email: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("sessionData")) ?? emptyState,
  reducers: {
    updateUserData(state, action) {
      const newUserData = action.payload;

      state.id = newUserData.id;
      state.fullName = newUserData.fullName;
      state.email = newUserData.email;

      const plaineStateCopy = { ...state };
      localStorage.setItem("sessionData", JSON.stringify(plaineStateCopy));
    },
    updateToken(state, action) {
      const newToken = action.payload;

      state.token = newToken;

      const plaineStateCopy = { ...state };
      localStorage.setItem("sessionData", JSON.stringify(plaineStateCopy));
    },
    startSession(state) {
      state.isLoggedIn = true;

      const plaineStateCopy = { ...state };
      localStorage.setItem("sessionData", JSON.stringify(plaineStateCopy));
    },
    reset() {
      localStorage.removeItem("sessionData");

      return emptyState;
    },
  },
});

export const { updateUserData, updateToken, startSession, reset } =
  authSlice.actions;

export const startSessionThunk =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const sessionData = await login({ email, password });

      const userData = {
        id: sessionData.user.id,
        fullName: `${sessionData.user.firstName} ${sessionData.user.lastName}`,
        email: sessionData.user.email,
      };

      dispatch(updateUserData(userData));
      dispatch(updateToken(sessionData.token));
      dispatch(startSession());
    } catch (error) {
      console.error(error);
    }
  };

export default authSlice.reducer;
