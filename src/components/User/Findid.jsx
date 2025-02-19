import axios from 'axios'
import React from 'react';
import { useState } from 'react';

function Findid() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsuser/Findid";
        const data = {
            user_name: userName,
            user_email: userEmail
        };

        axios.post(url, data)
            .then(response => {
                if (response.data && response.data.user_id) {
                    alert(`찾은 아이디: ${response.data.user_id}`);
                } else {
                    alert("해당 정보로 아이디를 찾을 수 없습니다.");
                }
            })
            .catch(() => {
                alert("아이디를 찾을 수 없습니다.");
            });
    }

    return (
        <div className="Findid">
            <div className="cateTitle">
                <h1>아이디찾기</h1>
            </div>

            <div className="find_ID">
                <form method="post" onSubmit={onSubmit} id="findID-form">
                    <input value={userName} type="text" className="findidbox" name="userName" onChange={(e) => setUserName(e.target.value)} placeholder="이름" />
                    <input value={userEmail} type="email" className="findidbox" name="userEmail" onChange={(e) => setUserEmail(e.target.value)} placeholder="이메일" />
                    <input type="submit" className="findBtn" value="아이디찾기" />
                </form>
            </div>
        </div>
    )
};

export default Findid;