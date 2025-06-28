import { useState } from 'react';
import axiosInstance from '../../api/axios.config';
import { useAuth } from '../../context/AuthContext';

function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // ✅ 로그인 요청 (URL은 실제 로그인 URL로 맞춰야 함)
      const response = await axiosInstance.post('/members/', {
        username,
        password,
      });

      console.log('로그인 성공:', response.data);

      const { access } = response.data;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      console.log('Bearer 설정 완료:', axiosInstance.defaults.headers.common['Authorization']);

      login();       // context 상태 업데이트 (로그인 처리)
      onClose();     // 모달 닫기

    } catch (err) {
      console.error('로그인 실패:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('로그인에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 반투명 회색 배경 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* 모달 */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-sm z-10">
        <h2 className="text-xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={loading}
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
