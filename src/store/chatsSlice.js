import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Async Thunks
export const fetchChatsByItem = createAsyncThunk(
  'chats/fetchByItem',
  async ({ itemId, userId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/rooms/item/${itemId}`, {
        headers: { 'x-user-id': userId },
      });
      if (!res.ok) throw new Error('Failed to fetch chats');
      const data = await res.json();
      return { itemId, chats: data || [] };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchChatCounts = createAsyncThunk(
  'chats/fetchCounts',
  async ({ items, userId }, { rejectWithValue }) => {
    try {
      const counts = {};
      for (const item of items) {
        if (item.userId === userId) {
          const res = await fetch(`${API_URL}/api/rooms/item/${item._id}`, {
            headers: { 'x-user-id': userId },
          });
          if (res.ok) {
            const data = await res.json();
            counts[item._id] = data?.length || 0;
          }
        }
      }
      return counts;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createChatRoom = createAsyncThunk(
  'chats/createRoom',
  async ({ itemId, userId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          itemId,
          interestedUserId: userId,
        }),
      });
      if (!res.ok) throw new Error('Failed to create room');
      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  chatsByItem: {}, // { itemId: [chats...] }
  chatCounts: {}, // { itemId: count }
  selectedItemChats: [],
  selectedItemId: null,
  creatingRoom: null,
  newRoom: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItemId = action.payload;
    },
    clearSelectedItem(state) {
      state.selectedItemId = null;
      state.selectedItemChats = [];
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    // Fetch Chats by Item
    builder
      .addCase(fetchChatsByItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatsByItem.fulfilled, (state, action) => {
        state.loading = false;
        const { itemId, chats } = action.payload;
        state.chatsByItem[itemId] = chats;
        state.selectedItemChats = chats;
      })
      .addCase(fetchChatsByItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Chat Counts
    builder
      .addCase(fetchChatCounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.chatCounts = action.payload;
      })
      .addCase(fetchChatCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Chat Room
    builder
      .addCase(createChatRoom.pending, (state) => {
        state.creatingRoom = true;
        state.error = null;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.creatingRoom = false;
        state.newRoom = action.payload;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.creatingRoom = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedItem, clearSelectedItem, clearError } = slice.actions;
export default slice.reducer;
