import { useEffect, useState } from 'react';
import axios from 'axios';

const Default = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/posts/');
        setPosts(response.data); // 백엔드 반환값에 따라 수정 필요
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">로딩 중...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">게시글 목록</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-3 border rounded hover:bg-gray-100 transition cursor-pointer"
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Default;
