import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
const IP = process.env.EXPO_PUBLIC_API_BASE_URL;
const initialState = {
  results: [],
  page: '',
  nextPage: 0,
  //sort: '',
  search: '',
  selectedCategory: '',
  isLoading: false,
  isError: false,
  data: [],
  dataCategory: [],
  loggedIn:false
};

export const logIn = createAsyncThunk('logIn', async (data: any) => {
  const response = await axios.post(`${IP}/authentication/log-in`, data, {withCredentials: true});
  return response.data;
});

export const getNotes = createAsyncThunk('getNotes', async () => {
  //const response = await axios.get(`${IP}/notes?sort=${data.sort}&search=${data.search}&category_id=${data.selectedCategory}`);
  const response = await axios.get(`${IP}/notes`,{
    withCredentials: true
  });
  return response.data;
});

export const getMoreNotes = createAsyncThunk('getMoreNotes', async (data: any) => {
  //const response = await axios.get(`${IP}/notes?sort=${data.sort}&page=${data.nextPage}&search=${data.search}&category_id=${data.selectedCategory}`, {withCredentials: true});
  const response = await axios.get(`${IP}/notes`,{
    withCredentials: true
  });
  return response.data;
});

export const insertNotes = createAsyncThunk('insertNotes', async (data: any) => {
  const response = await axios.post(`${IP}/notes`, data, {withCredentials: true});
  return response.data;
});

export const updateNotes = createAsyncThunk('updateNotes', async (data: any) => {
  const response = await axios.patch(`${IP}/notes/${data.id}`, data);
  return response.data;
});

export const deleteNotes = createAsyncThunk('deleteNotes', async (id) => {
  const response = await axios.delete(`${IP}/notes/${id}`);
  return response.data;
});

export const getCategories = createAsyncThunk('getCategories', async () => {
  const response = await axios.get(`${IP}/categories`, {withCredentials: true});
  return response.data;
});

export const insertCategories = createAsyncThunk('insertCategories', async (data) => {
  const response = await axios.post(`${IP}/categories`, data, {withCredentials: true});
  return response.data;
});

export const deleteCategories = createAsyncThunk('deleteCategories', async (id) => {
  const response = await axios.delete(`${IP}/categories/${id}`);
  return response.data;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => [getNotes, getMoreNotes, insertNotes, updateNotes, deleteNotes, getCategories, insertCategories, deleteCategories].includes(action.type),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(getNotes.fulfilled, getMoreNotes.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.page = action.payload.page;
          state.nextPage = parseInt(action.payload.page) + 1;
          //state.sort = action.payload.sort;
          state.search = action.payload.search;
          state.selectedCategory = action.payload.category;
          state.data = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(insertNotes.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.data = [action.payload.value, ...state.data];
        }
      )
      .addMatcher(
        isAnyOf(updateNotes.fulfilled),
        (state, action) => {
          state.isLoading = false;
          const updatedNote = action.payload.value[0];
          const index = state.data.findIndex((note) => note.id === updatedNote.id);
          if (index !== -1) {
            state.data[index] = updatedNote;
          }
        }
      )
      .addMatcher(
        isAnyOf(deleteNotes.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.data = state.data.filter((note) => note.id !== action.payload.id);
        }
      )
      .addMatcher(
        isAnyOf(getCategories.fulfilled),
        (state, action) => {
          state.isLoading = false;
          //const omitNotes = action.payload.map(({ ['notes']: _, ...rest }) => rest);
          //state.dataCategory = omitNotes;
          state.dataCategory = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(insertCategories.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.dataCategory = [action.payload.value, ...state.dataCategory];
        }
      )
      .addMatcher(
        isAnyOf(deleteCategories.fulfilled),
        (state, action) => {
          state.isLoading = false;
          state.dataCategory = state.dataCategory.filter((category) => category.id !== action.payload.id);
        }
      )
      .addMatcher(
        isAnyOf(getNotes.rejected, getMoreNotes.rejected, insertNotes.rejected, updateNotes.rejected, deleteNotes.rejected, getCategories.rejected, insertCategories.rejected, deleteCategories.rejected, logIn.rejected),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(logIn.fulfilled),
        (state) => {
          state.loggedIn = true;
          state.isLoading = false;
          state.isError = false;
        }
      )
  },
});

export default notesSlice.reducer;