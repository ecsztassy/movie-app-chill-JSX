import axios from 'axios';

// Mengambil URL utama dari file .env (Pastikan file .env berisi: VITE_API_URL=https://6a41fa8a7602860e65209c71.mockapi.io)
const API_URL = import.meta.env.VITE_API_URL;

export const getDaftar = async () => {
  // MockAPI membutuhkan path '/daftar' di ujung URL-nya
  const response = await axios.get(`${API_URL}/daftar`);
  return response.data;
};

export const addDaftar = async (film) => {
  // Pastikan melakukan POST ke endpoint '/daftar' dengan data objek film
  const response = await axios.post(`${API_URL}/daftar`, film);
  return response.data;
};

export const updateDaftar = async (id, film) => {
  const response = await axios.put(`${API_URL}/daftar/${id}`, film);
  return response.data;
};

export const deleteDaftar = async (id) => {
  const response = await axios.delete(`${API_URL}/daftar/${id}`);
  return response.data;
};