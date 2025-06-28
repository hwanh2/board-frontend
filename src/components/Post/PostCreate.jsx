import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // TODO: API 연동 예정
    console.log('제목:', title);
    console.log('내용:', content);

    navigate('/');
  };

  return (
    <div className="max-w-5xl w-full mx-auto bg-white p-10 rounded shadow">
      <h1 className="text-3xl font-bold mb-8">게시글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 제목 입력 */}
        <input
          type="text"
          className="w-full text-2xl font-semibold placeholder-gray-400 focus:outline-none border-b p-3"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 에디터 UI */}
        <div className="border rounded">
          {/* 에디터 메뉴 바 (미구현, UI만) */}
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

          {/* 에디터 영역 */}
          <textarea
            className="w-full p-4 h-[500px] focus:outline-none resize-none"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-5 py-2 rounded border hover:bg-gray-100 transition"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreate;
