import { useEffect, useState } from 'react';
import { getPosts } from '../api/postsApi';
import { Link } from 'react-router-dom';

const Default = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">게시글을 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="p-8 pl-20">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Total {posts.length}건
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="border rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button className="bg-blue-500/90 text-white px-4 py-1 rounded hover:bg-blue-600/80 transition">
            검색
          </button>
          <Link
            to="/posts/new"
            className="bg-blue-500/90 text-white px-4 py-1 rounded hover:bg-blue-600/80 transition">
            글쓰기
          </Link>
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-center">
          <thead className="bg-gray-100 border-t border-gray-400">
            <tr>
              <th className="px-4 py-2">번호</th>
              <th className="px-4 py-2 text-left">제목</th>
              <th className="px-4 py-2">작성자</th>
              <th className="px-4 py-2">작성일</th>
              <th className="px-4 py-2">조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-gray-500">
                  게시글이 없습니다. 첫 게시글을 작성해보세요!
                </td>
              </tr>
            ) : (
              posts.map((post, index) => (
                <tr
                  key={post.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{posts.length - index}</td>
                  <td className="px-4 py-2 text-left text-blue-600 hover:underline">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td className="px-4 py-2">{post.author || '익명'}</td>
                  <td className="px-4 py-2">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-2">{post.views}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 (임시) */}
      <div className="flex justify-center mt-4 space-x-2">
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">처음</button>
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">1</button>
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">2</button>
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">3</button>
        <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">맨끝</button>
      </div>
    </div>
  );
};

export default Default;
