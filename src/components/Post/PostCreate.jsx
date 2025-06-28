import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/postCreateApi';

function PostCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const post = await createPost(title, content);
      console.log('게시글 생성 성공:', post);
      alert('게시글이 성공적으로 작성되었습니다.');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto bg-white p-10 rounded shadow">
      <h1 className="text-3xl font-bold mb-8">게시글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <input
          type="text"
          className="w-full text-2xl font-semibold placeholder-gray-400 focus:outline-none border-b p-3"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <div className="border rounded">
          <div className="flex items-center space-x-2 p-2 border-b bg-gray-50 text-gray-600 text-sm">
            <button type="button">🖉</button>
            <button type="button" className="font-bold">B</button>
            <button type="button" className="italic">I</button>
            <button type="button" className="underline">U</button>
            <button type="button">🔗</button>
            <button type="button">🖼️</button>
            <button type="button">📹</button>
            <button type="button">{`</>`}</button>
          </div>

          <textarea
            className="w-full p-4 h-[500px] focus:outline-none resize-none"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-5 py-2 rounded border hover:bg-gray-100 transition"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            취소
          </button>
          <button
            type="submit"
            className={`px-5 py-2 rounded text-white transition ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? '작성 중...' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreate;
