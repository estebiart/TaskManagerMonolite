import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addItem, fetchItems as fetchItemsService, fetchItemsByUser } from '@/services/itemService';
import { ItemState, AddItemPayload, Item } from '@/interfaces/Item.interface';


export const fetchItemsAsync = createAsyncThunk<Item[]>(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const items = await fetchItemsService(); 
      return items as Item[]; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching items');
    }
  }
);


export const addItemAsync = createAsyncThunk<Item, AddItemPayload>(
  'items/addItem',
  async (item, { rejectWithValue }) => {
    try {
      const response = await addItem(item);
      return response; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error adding item');
    }
  }
);

export const fetchUserItemsAsync = createAsyncThunk<Item[], number>(
  'items/fetchUserItems',
  async (userId, { rejectWithValue }) => {
    try {
      const items = await fetchItemsByUser(userId);
      return items as Item[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching user items');
    }
  }
);


const initialState: ItemState = {
  items: [],
  status: 'inactivo',
  error: null,
};


const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(fetchItemsAsync.pending, (state) => {
        state.status = 'cargando';
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = 'completado';
        state.items = action.payload; 
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.status = 'fallido';
        state.error = action.payload as string;
      });


    builder
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'cargando';
      })
      .addCase(addItemAsync.fulfilled, (state, action: PayloadAction<Item>) => {
        state.status = 'completado';
        state.items.push(action.payload); 
      })
      .addCase(addItemAsync.rejected, (state, action) => {
        state.status = 'fallido';
        state.error = action.payload as string;
      });
     builder
      .addCase(fetchUserItemsAsync.pending, (state) => {
        state.status = 'cargando';
      })
      .addCase(fetchUserItemsAsync.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = 'completado';
        state.items = action.payload; 
      })
      .addCase(fetchUserItemsAsync.rejected, (state, action) => {
        state.status = 'fallido';
        state.error = action.payload as string;
      });
  },
});

export default itemSlice.reducer;
