import Navbar from '../components/Navbar/Navbar';
// import Footer from './Footer'; // 필요하면 Footer 추가 가능

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 헤더 */}
      <Navbar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4">
        {children}
      </main>

      {/* 푸터 (필요하면 추가) */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
