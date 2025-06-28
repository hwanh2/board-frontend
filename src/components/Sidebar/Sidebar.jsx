import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-blue-600/80 text-white p-4 space-y-4">
      {/* 상단 로고 */}
      <div className="text-2xl font-bold mb-6">Board</div>

      {/* Dashboard */}
      <Link
        to="/"
        className="flex items-center px-3 py-2 rounded hover:bg-blue-600/80 transition"
      >
        🏠 <span className="ml-2">Dashboard</span>
      </Link>

      {/* 구분선 */}
      <hr className="border-blue-300/50 my-2" />

      {/* Interface */}
      <div className="text-xs text-blue-100 uppercase mt-4 mb-2">
        Interface
      </div>
      <Link
        to="/components"
        className="flex items-center px-3 py-2 rounded hover:bg-blue-600/80 transition"
      >
        ⚙️ <span className="ml-2">Components</span>
      </Link>
      <Link
        to="/utilities"
        className="flex items-center px-3 py-2 rounded hover:bg-blue-600/80 transition"
      >
        🧰 <span className="ml-2">Utilities</span>
      </Link>

      {/* 구분선 */}
      <hr className="border-blue-300/50 my-2" />

      {/* Addons */}
      <div className="text-xs text-blue-100 uppercase mt-4 mb-2">Addons</div>
      <Link
        to="/pages"
        className="flex items-center px-3 py-2 rounded hover:bg-blue-600/80 transition"
      >
        📄 <span className="ml-2">Pages</span>
      </Link>
      <Link
        to="/charts"
        className="flex items-center px-3 py-2 rounded hover:bg-blue-600/80 transition"
      >
        📊 <span className="ml-2">Charts</span>
      </Link>
      <Link
        to="/tables"
        className="flex items-center px-3 py-2 rounded hover:bg-blue-600/80 transition"
      >
        📋 <span className="ml-2">Tables</span>
      </Link>
    </div>
  );
};

export default Sidebar;
