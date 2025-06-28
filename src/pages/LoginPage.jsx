import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/Modal/LoginModal';

function LoginModalPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return <LoginModal onClose={handleClose} />;
}

export default LoginModalPage;
