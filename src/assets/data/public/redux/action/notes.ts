import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const IP = 'http://192.168.6.181:3000';     // IP Backend

export const getNotes = createAsyncThunk('notes/getNotes', async (data: any) => {
  const response = await axios.get(`${IP}/notes?sort=${data.sort}&search=${data.search}&category_id=${data.selectedCategory}`);
  return response.data;
});

export const getMoreNotes = createAsyncThunk('notes/getMoreNotes', async (data: any) => {
  const response = await axios.get(`${IP}/notes?sort=${data.sort}&page=${data.nextPage}&search=${data.search}&category_id=${data.selectedCategory}`);
  return response.data;
});

export const insertNotes = createAsyncThunk('notes/insertNotes', async (data) => {
  const response = await axios.post(`${IP}/notes`, data);
  return response.data;
});

export const updateNotes = createAsyncThunk('notes/updateNotes', async (data: any) => {
  const response = await axios.patch(`${IP}/notes/${data.id}`, data);
  return response.data;
});

export const deleteNotes = createAsyncThunk('notes/deleteNotes', async (id) => {
  const response = await axios.delete(`${IP}/notes/${id}`);
  return response.data;
});

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await axios.get(`${IP}/categories`);
  return response.data;
});

export const insertCategories = createAsyncThunk('categories/insertCategories', async (data) => {
  const response = await axios.post(`${IP}/categories`, data);
  return response.data;
});

export const deleteCategories = createAsyncThunk('categories/deleteCategories', async (id) => {
  const response = await axios.delete(`${IP}/categories/${id}`);
  return response.data;
});

const initialState = {
  // Define your initial state here if needed
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, action) => {
        // Handle getNotes fulfilled action
      })
      .addCase(getMoreNotes.fulfilled, (state, action) => {
        // Handle getMoreNotes fulfilled action
      })
      .addCase(insertNotes.fulfilled, (state, action) => {
        // Handle insertNotes fulfilled action
      })
      .addCase(updateNotes.fulfilled, (state, action) => {
        // Handle updateNotes fulfilled action
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        // Handle deleteNotes fulfilled action
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        // Handle getCategories fulfilled action
      })
      .addCase(insertCategories.fulfilled, (state, action) => {
        // Handle insertCategories fulfilled action
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        // Handle deleteCategories fulfilled action
      });
  },
});

export default notesSlice.reducer;