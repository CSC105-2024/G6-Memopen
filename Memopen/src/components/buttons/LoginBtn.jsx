import { useNavigate } from "react-router-dom";

const LoginBtn = ({ setIsLogin }) => {
  const HomeNavigate = useNavigate();
  const handleLogin = () => {
    setIsLogin(true);
    HomeNavigate("/HomePage");
  };
  return (
    <button className="border p-2" onClick={handleLogin}>
      Login
    </button>
  );
};
export default LoginBtn;
