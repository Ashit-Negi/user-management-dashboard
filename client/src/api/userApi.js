import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// api for getusers
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// api for createuser
export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

// api for updateuser
export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

// api for deleteuser
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
