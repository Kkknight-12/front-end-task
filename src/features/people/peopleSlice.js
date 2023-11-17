import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

// ----------------------------------------------------------------------

export const getPeople = createAsyncThunk(
  'people/getPeople',
  async (customApi) => {
    try {
      const apiUrl = customApi
        ? customApi
        : `https://swapi.dev/api/people/?page=1`;
      const response = await axios.get(apiUrl, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const searchPeopleByName = createAsyncThunk(
  'people/searchPeopleByName',
  async (name) => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${name}`,
        {
          headers: { 'Content-type': 'application/json; chartset=UTF-8' },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    count: 0,
    next: null,
    previous: null,
    people: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPeople.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPeople.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.people = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(getPeople.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchPeopleByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchPeopleByName.fulfilled, (state, action) => {
        console.log('searchPeopleByName ', action.payload.results);
        state.status = 'succeeded';
        state.people = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(searchPeopleByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
