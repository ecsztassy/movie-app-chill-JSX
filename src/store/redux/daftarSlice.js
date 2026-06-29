import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDaftar, addDaftar, updateDaftar, deleteDaftar } from '../../services/api'

// GET
export const fetchDaftar = createAsyncThunk('daftar/fetchAll', async () => {
  const data = await getDaftar()
  return data
})

// ADD
export const addFilm = createAsyncThunk('daftar/add', async (film) => {
  const data = await addDaftar(film)
  return data
})

// UPDATE
export const editFilm = createAsyncThunk('daftar/edit', async ({ id, data }) => {
  const res = await updateDaftar(id, data)
  return res
})

// DELETE
export const hapusFilm = createAsyncThunk('daftar/hapus', async (id) => {
  await deleteDaftar(id)
  return id
})

const daftarSlice = createSlice({
  name: 'daftar',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDaftar.pending, (state) => { state.loading = true })
      .addCase(fetchDaftar.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchDaftar.rejected, (state) => {
        state.loading = false
        state.error = 'Gagal memuat data'
      })
      .addCase(addFilm.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
      .addCase(editFilm.fulfilled, (state, action) => {
        const idx = state.data.findIndex(f => f.id === action.payload.id)
        if (idx !== -1) state.data[idx] = action.payload
      })
      .addCase(hapusFilm.fulfilled, (state, action) => {
        state.data = state.data.filter(f => f.id !== action.payload)
      })
  }
})

export default daftarSlice.reducer