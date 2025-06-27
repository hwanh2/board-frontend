import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">게시글 상세 페이지</h1>
      <p className="mt-2">게시글 ID: {id}</p>
      <p className="mt-2 text-gray-600">여기에 게시글 상세 내용을 보여주면 됩니다.</p>
    </div>
  );
}

export default PostDetailPage;
