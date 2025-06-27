import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 게시글 리스트 (루트) */}
        <Route path="/" element={<Main />} />

        {/* 게시글 상세 */}
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
