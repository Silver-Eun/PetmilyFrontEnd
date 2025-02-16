import { Link } from "react-router-dom";

// 이미지
import order from "../../assets/Images/mypage/order.png";
import profile from "../../assets/Images/mypage/profile.png";
import board from "../../assets/Images/mypage/board.png";
import cart from "../../assets/Images/mypage/cart.png";

function MyPage() {
  return (
    <div className="MyPage">
      <div className="mypageTitleArea">
        <ul type="square">
          <h1>마이 페이지</h1>
        </ul>
      </div>
      <div className="shopMain">
        <Link to="/user/orderList">
          <div className="orderList">
            <div className="orderListImg">
              <img src={order} alt="" />
            </div>
            <strong></strong>
            <span>주문내역 조회</span>
            <p>고객님의 주문내역을 확인하실 수 있습니다.</p>
          </div>
        </Link>
        <Link to="/user/mypage/myprofile">
          <div className="profil">
            <div className="orderListImg">
              <img src={profile} alt="" />
            </div>
            <strong></strong>
            <span>회원 정보</span>
            <p>회원이신 고객님의 개인정보를 관리하는 공간입니다.</p>
          </div>
        </Link>
        <Link to="/user/mypage/manageBoard/inquiry">
          <div className="board">
            <div className="orderListImg">
              <img src={board} alt="" />
            </div>
            <strong></strong>
            <span>게시글 관리</span>
            <p>고객님께서 작성하신 게시물을 관리하는 공간입니다.</p>
          </div>
        </Link>
        <Link to="/user/cart">
          <div className="cart">
            <div className="orderListImg">
              <img src={cart} alt="" />
            </div>
            <strong></strong>
            <span>장바구니</span>
            <p>장바구니에 등록하신 상품의 목록을 보여드립니다.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MyPage;