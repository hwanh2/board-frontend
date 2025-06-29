import { axiosInstance } from './axios.config';

/**
 * 게시글 목록을 불러오는 함수
 * GET /posts/
 */
export const getPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/');
    const posts = response.data; // 백엔드 반환 구조에 따라 조정 필요

    // 배열 그대로 반환
    return posts;
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

export const getPostById = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};