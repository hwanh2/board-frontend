import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 게시글 리스트 (루트) */}
        <Route path="/" element={<Main />} />
        {/* 게시글 상세 */}
        <Route path="/posts/:id" element={<PostDetailPage />} />
        {/* 글쓰기 */}
        <Route path="/posts/new" element={<PostCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
