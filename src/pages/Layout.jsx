import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
// import Footer from './Footer'; // 필요 시 추가 가능

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-80 text-white fixed h-full">
    <Sidebar />
  </aside>

  {/* Main Area */}
  <div className="flex flex-col flex-1 ml-64">
    {/* Header */}
    <header className="fixed top-0 left-80 right-0 z-10 bg-white shadow h-16 flex items-center px-4">
      <Navbar />
    </header>

    {/* Main Content */}
    <main className="flex-1 p-6 bg-gray-100 mt-16">
      {children}
    </main>
  </div>
</div>

  );
};

export default Layout;
