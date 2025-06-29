import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../api/postsApi';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return alert('댓글을 입력해주세요.');
    alert(`댓글 등록: ${commentText}`);
    setCommentText('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-medium">게시글을 불러오는 중입니다...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-10 text-gray-500">게시글을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white rounded shadow">
      {/* 게시글 제목 */}
      <h1 className="text-3xl font-bold mb-4 border-b pb-2">{post.title}</h1>

      {/* 게시글 내용 */}
      <div className="text-gray-700 whitespace-pre-wrap mb-8">{post.content}</div>

      {/* 댓글 영역 */}
      <div className="mt-12">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">
            댓글 {post.comments.length}
          </h2>
        </div>

        {/* 댓글 리스트 */}
        {post.comments.length === 0 ? (
          <div className="text-gray-500 mb-4">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>
        ) : (
          <ul className="space-y-3 mb-6">
            {post.comments.map((comment) => (
              <li key={comment.id} className="p-3 bg-gray-50 rounded border">
                {comment.content}
              </li>
            ))}
          </ul>
        )}

        {/* 댓글 작성 폼 */}
        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-3">
          <textarea
            className="w-full border rounded p-3 focus:outline-none focus:ring resize-none"
            rows="3"
            placeholder="댓글을 입력하세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            댓글 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
