import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchItems = createAsyncThunk('items/fetch', async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/items?${qs}`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
});

export const updateItemStatus = createAsyncThunk(
  'items/updateStatus',
  async ({ itemId, userId, status }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/items/${itemId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({
          status,
          userId,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update status');
      }

      return res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
      })
      .addCase(updateItemStatus.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateItemStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default slice.reducer;

