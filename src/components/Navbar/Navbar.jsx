import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-white shadow fixed top-0 left-80 right-0 z-10">
      {/* 좌측 로고 */}
      <Link to="/" className="text-xl font-bold text-blue-600 whitespace-nowrap">
        게시판
      </Link>

      {/* 중앙 검색바 */}
      <div className="flex-1 max-w-md mx-4 relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search for..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* 우측 메뉴 */}
      <div className="flex items-center space-x-7 text-gray-600">
        <button className="relative">
    🔔
    <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
      3
    </span>
  </button>
  <button className="relative">
    ✉️
    <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
      7
    </span>
  </button>
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            로그아웃
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
