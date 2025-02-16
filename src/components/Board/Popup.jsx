import axios from 'axios';
import React from 'react';

function Popup({ showPopup, closePopup, data }) {

  const isLoggedIn =
    sessionStorage.getItem("loggedInUser");
  const user = isLoggedIn ? JSON.parse(isLoggedIn) : null;
  const userName = user ? user.user_name : ''; // 유저 이름 변수

  const replySubmit = async () => {
    let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/review/reply/insert";

    await axios({
      url: url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        review_id: data,
        reply_writer: userName,
        reply_content: document.getElementById('reply_content').value
      }
    }).then(() => {
      alert("댓글 등록이 완료되었습니다.");
      closePopup();
      window.location.reload();
    }
    ).catch(() => {
      alert("댓글 등록에 실패했습니다.");
    });
  }

  return (
    <>
      {showPopup && (
        <div style={{ marginBottom: '15px' }}>
          <table style={{ width: '100%' }}>
            <tr>
              <div style={{ width: '15%' }}>
                <th>작성자</th>
                <td>{userName}</td>
              </div>
              <div style={{ width: '75%' }}>
                <th>내용</th>
                <td><input id='reply_content' style={{ width: '550px', height: '30px' }} type='text' /></td>
              </div>
              <div>
                <input onClick={replySubmit} type='button' value='등록'></input>
              </div>
            </tr>
          </table>
        </div>
      )}
    </>
  );
}

export default Popup;