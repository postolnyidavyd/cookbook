import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLoginModal: false,
  showSaveRecipeModal: false,
  notification: {
    message: '',
    type: '', // 'success' | 'error' | 'info'
  },
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLoginModal(state) {
      state.showLoginModal = !state.showLoginModal;
    },
    setLoginModal(state, { payload: show }) {
      state.showLoginModal = show;
    },
    toggleSaveRecipeModal(state) {
      state.showSaveRecipeModal = !state.showSaveRecipeModal;
    },
    setSaveRecipeModal(state, { payload: show }) {
      state.showSaveRecipeModal = show;
    },
    setNotification(state, { payload }) {
      const { message, type } = payload;
      state.notification.message = message;
      state.notification.type = type;
    },
  },
});

export const {
  toggleLoginModal,
  setLoginModal,
  toggleSaveRecipeModal,
  setSaveRecipeModal,
  setNotification,
} = uiSlice.actions;
export default uiSlice.reducer;
