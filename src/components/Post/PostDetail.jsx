import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getPostSummary } from '../../api/postsApi';
import { createComment } from '../../api/commentCreateApi';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [postSummary, setPostSummary] = useState(null);
  const [commentSummary, setCommentSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return alert('댓글을 입력해주세요.');

    try {
      setSubmitting(true);
      const newComment = await createComment(id, commentText);
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
      setCommentText('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSummaryClick = async () => {
    if (loadingSummary) return;
    setLoadingSummary(true);
    setShowSummaryModal(true);
    try {
      const data = await getPostSummary(id);
      setPostSummary(data.post_summary || '');
      setCommentSummary(data.comment_summary || '');
    } catch (error) {
      console.error('요약 생성/조회 실패:', error);
      alert('요약 생성에 실패했습니다.');
      setShowSummaryModal(false);
    } finally {
      setLoadingSummary(false);
    }
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
    <div className="relative max-w-6xl mx-auto p-10 bg-white rounded shadow">
      {/* 요약 모달 */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`bg-white rounded-xl shadow-xl relative ${loadingSummary ? 'p-6 w-64' : 'p-8 w-full max-w-4xl max-h-[85vh] overflow-y-auto'}`}>
            {/* 닫기 버튼 */}
            <button
              onClick={() => setShowSummaryModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {loadingSummary ? (
              <div className="flex flex-col items-center justify-center h-40">
                <div className="loader mb-4"></div>
                <p className="text-gray-600">요약 생성 중...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* 게시글 요약 */}
                <div className="p-5 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-blue-500 text-xl">📝</span>
                    <h3 className="text-lg font-semibold text-blue-700">게시글 요약</h3>
                  </div>
                  {postSummary ? (
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                      {postSummary}
                    </p>
                  ) : (
                    <p className="text-gray-400">게시글 요약이 없습니다.</p>
                  )}
                </div>

                {/* 구분선 */}
                <hr className="border-t border-gray-300" />

                {/* 댓글 요약 */}
                <div className="p-5 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-green-500 text-xl">💬</span>
                    <h3 className="text-lg font-semibold text-green-700">댓글 요약</h3>
                  </div>
                  {commentSummary ? (
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                      {commentSummary}
                    </p>
                  ) : (
                    <p className="text-gray-400">댓글 요약이 없습니다.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 게시글 제목 + 요약 버튼 */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <button
          onClick={handleSummaryClick}
          disabled={loadingSummary}
          className={`px-4 py-2 rounded text-white transition ${
            loadingSummary ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loadingSummary ? '요약 중...' : '게시글 및 댓글 요약'}
        </button>
      </div>

      {/* 작성자, 작성일, 조회수 */}
      <div className="text-sm text-gray-500 mb-6 border-b pb-4">
        작성자: {post.user_id?.username || '익명'} ·{' '}
        {new Date(post.created_at).toLocaleString('ko-KR')} · 조회수: {post.views || 0}
      </div>

      {/* 게시글 내용 */}
      <div className="text-gray-800 whitespace-pre-wrap mb-12 leading-relaxed">
        {post.content}
      </div>

      {/* 댓글 영역 */}
      <div className="mt-8">
        <div className="flex items-center justify-between border-b pb-2 mb-6">
          <h2 className="text-lg font-semibold">댓글</h2>
          <span className="text-sm text-gray-500">총 {post.comments.length}개</span>
        </div>

        {post.comments.length === 0 ? (
          <div className="text-gray-500 mb-6">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>
        ) : (
          <ul className="space-y-3 mb-8">
            {post.comments.map((comment) => (
              <li key={comment.id} className="p-3 bg-gray-50 rounded border">
                <div className="text-sm text-gray-600 mb-1">
                  {comment.user?.username || '익명'} ·{' '}
                  {new Date(comment.created_at).toLocaleString('ko-KR')}
                </div>
                <div>{comment.content}</div>
              </li>
            ))}
          </ul>
        )}

        {/* 댓글 작성 */}
        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-3">
          <textarea
            className="w-full border rounded p-3 focus:outline-none focus:ring resize-none"
            rows="3"
            placeholder="댓글을 입력하세요"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={submitting}
          ></textarea>
          <button
            type="submit"
            className={`self-end px-4 py-2 rounded text-white transition ${
              submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={submitting}
          >
            {submitting ? '등록 중...' : '댓글 등록'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;
