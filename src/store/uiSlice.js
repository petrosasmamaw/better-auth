import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  chatModalOpen: false,
  selectedItemForChats: null,
  togglingStatus: null,
  creatingRoom: null,
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    openChatModal(state, action) {
      state.chatModalOpen = true;
      state.selectedItemForChats = action.payload;
    },
    closeChatModal(state) {
      state.chatModalOpen = false;
      state.selectedItemForChats = null;
    },
    setTogglingStatus(state, action) {
      state.togglingStatus = action.payload;
    },
    clearTogglingStatus(state) {
      state.togglingStatus = null;
    },
    setCreatingRoom(state, action) {
      state.creatingRoom = action.payload;
    },
    clearCreatingRoom(state) {
      state.creatingRoom = null;
    },
  }
});

export const {
  setUserId,
  openChatModal,
  closeChatModal,
  setTogglingStatus,
  clearTogglingStatus,
  setCreatingRoom,
  clearCreatingRoom,
} = slice.actions;

export default slice.reducer;
