import LoginBtn from "../components/buttons/LoginBtn";
function Login({setIsLogin}){
    return(
        <div>
            Login
            <LoginBtn setIsLogin={setIsLogin}/>
            
        </div>
    )
}
export default Login;