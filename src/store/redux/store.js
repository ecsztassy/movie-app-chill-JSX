import { configureStore } from '@reduxjs/toolkit'
import daftarReducer from './daftarSlice'

const store = configureStore({
  reducer: {
    daftar: daftarReducer,
  },
})

export default store