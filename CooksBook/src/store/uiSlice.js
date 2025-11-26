import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLoginModal: false,
  showSaveRecipeModal: false,
  saveRecipeModal:{
    isOpen:false,
    recipeId:null
  },
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
      state.saveRecipeModal.isOpen = !state.saveRecipeModal.isOpen;
    },
    setSaveRecipeModal(state, action) {
      const {isOpen,recipeId} = action.payload;
      state.saveRecipeModal.isOpen = isOpen
      state.saveRecipeModal.recipeId = recipeId;
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
