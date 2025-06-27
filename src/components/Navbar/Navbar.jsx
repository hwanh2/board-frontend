import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">게시판</Link>
      <div className="space-x-4">
        <Link to="/">홈</Link>
        <Link to="/posts">게시판</Link>
      </div>
    </nav>
  );
}

export default Navbar;
