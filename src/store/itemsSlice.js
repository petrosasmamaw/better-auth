import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchItems = createAsyncThunk('items/fetch', async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/items?${qs}`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
});

const slice = createSlice({
  name: 'items',
  initialState: { items: [], total: 0, page: 1, limit: 20, status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.limit = action.payload.limit || 20;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default slice.reducer;
