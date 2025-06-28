import axiosInstance from './axios.config';

export const createPost = async (title, content) => {
  const response = await axiosInstance.post('/posts/', { title, content });
  return response.data;
};
