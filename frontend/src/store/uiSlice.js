import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLoginModal: false,
  showSaveRecipeModal: false,
  saveRecipeModal:{
    isOpen:false,
    recipeId:null
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
    setSaveRecipeModal(state, action) {
      const {isOpen,recipeId} = action.payload;
      state.saveRecipeModal.isOpen = isOpen
      state.saveRecipeModal.recipeId = recipeId;
    },
  },
});

export const {
  toggleLoginModal,
  setLoginModal,
  toggleSaveRecipeModal,
  setSaveRecipeModal,
} = uiSlice.actions;
export default uiSlice.reducer;
