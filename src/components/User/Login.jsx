import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsuser/Login";
        const data = {
            user_id: userId,
            user_password: userPassword,
        };

        axios
            .post(url, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // 세션 쿠키 사용을 위해 추가
            })
            .then((response) => {
                const user = response.data;
                // 서버에서 받은 사용자 정보를 sessionStorage에 저장
                sessionStorage.setItem("loggedInUser", JSON.stringify(user));
                navigate("/");  // 로그인 후 이동
            })
            .catch(() => {
                alert("아이디 또는 비밀번호가 다릅니다");
            });
        };

    // 네이버 로그인(비구현)
    const NaverLogin = () => {
        const NAVER_CLIENT_ID = "X8MsAj1qeOGBGpWCrM5B";
        const REDIERCT_URI = "http://localhost:3000/NaverLogin";
        const STATE = "false";
        const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIERCT_URI}`;
        
        window.location.href = NAVER_AUTH_URL;
    };
    
    // 카카오 로그인(비구현)
    const KakaoLogin = () => {
        const REST_API_KEY = "36c72e69dcc46636ff1acefe07171573";
        const REDIERCT_URI = "http://localhost:3000/KakaoLogin";
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIERCT_URI}&response_type=code`;

        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <div className="Login">
            <div className="cateTitle">
                <h1>로그인</h1>
            </div>

            <div className="login_">
                <form onSubmit={onSubmit} id="login-form">
                    <input
                        type="text"
                        className="loginbox"
                        name="userId"
                        placeholder="아이디"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <input
                        type="password"
                        className="loginbox"
                        name="userPassword"
                        placeholder="비밀번호"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <input type="submit" className="loginBtn" value="로그인" />
                </form>
                <hr />
                <button className="kakao" onClick={KakaoLogin}>
                    카카오 로그인(비구현)
                </button>
                <button className="naver" onClick={NaverLogin}>
                    네이버 로그인(비구현)
                </button>
                <ul>
                    <Link to="/user/signup" style={{ textDecoration: "none" }}>
                        <li>회원가입</li>
                    </Link>
                    <Link to="/user/findID" style={{ textDecoration: "none" }}>
                        <li>아이디 찾기</li>
                    </Link>
                    <Link to="/user/findPW" style={{ textDecoration: "none" }}>
                        <li>비밀번호 찾기</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default Login;