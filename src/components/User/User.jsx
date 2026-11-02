











import { Route, Routes } from "react-router-dom";

import Cart from './Cart';
import MyPage from './MyPage';
import Profile from './Profile';
import ManageInquiry from './ManageInquiry';
import InquiryDetail from "../Community/InquiryDetail";
import ReviewDetail from "../Community/ReviewDetail";
import ManageReview from "./ManageReview";
import Order from './Order';
import OrderList from './OrderList';
import Signup from './Signup';
import Login from './Login';
import Findid from './Findid';
import Findpw from './Findpw';
import Success from './Success';
import Update from './Update';

function User({ cartItems, setCartItems, nothing, setNothing, onDelete, deleteOrder, increQuantity, decreQuantity, checkedItems, orderItems, allOrder, selectedOrder, allCheck, checkChange, calcProductPrice }) {
  return (
    <Routes>
            <Route path="/cart" element={<Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        nothing={nothing}
        setNothing={setNothing}
        onDelete={onDelete}
        increQuantity={increQuantity}
        decreQuantity={decreQuantity}
        checkedItems={checkedItems}
        orderItems={orderItems}
        allOrder={allOrder}
        selectedOrder={selectedOrder}
        allCheck={allCheck}
        checkChange={checkChange}
        calcProductPrice={calcProductPrice} />} />
      
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/myprofile" element={<Profile />} />
            <Route path="/mypage/manageboard/inquiry" element={<ManageInquiry />} />
            <Route path="/mypage/manageboard/inquiry/:id" element={<InquiryDetail />} />
            <Route path="/mypage/manageboard/review" element={<ManageReview />} />
            <Route path="/mypage/manageboard/review/:id" element={<ReviewDetail />} />
            <Route path="/order" element={<Order cartItems={cartItems} deleteOrder={deleteOrder} orderItems={orderItems} calcProductPrice={calcProductPrice} />} />
            <Route path="/orderlist" element={<OrderList />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findID" element={<Findid />} />
            <Route path="/findPW" element={<Findpw />} />
            <Route path="/update" element={<Update />} />
            <Route path="/success" element={<Success />} />
            
        </Routes>);

}

export default User;
