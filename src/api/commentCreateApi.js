import axiosInstance from './axios.config';

export const createComment = async (postId, content) => {
  const response = await axiosInstance.post(`/posts/${postId}/comments`, { content });
  return response.data; // 생성된 댓글 객체 반환
};
