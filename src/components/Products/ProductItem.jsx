import { Link } from 'react-router-dom'
import axios from "axios";

const ProductItem = ({ it, calcProductPrice, setCartItems }) => {
    
    // 장바구니 추가
    function cartInsertP(a) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        
        if (!loggedInUser) {
            alert("로그인 해주세요");
            return;
        }
        
        let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rscart/cartInsertP/" + a;
        
        axios.post(url)
            .then(() => {
                alert("상품이 장바구니에 추가되었습니다.");
                axios
                    .get("/rscart/cartList")
                    .then((response) => {
                        setCartItems(response.data);
                    });
            })
            .catch(() => {
                alert("장바구니 추가에 실패했습니다.")
            });
    }

    return (
        <div className="ProductItem">
            <Link to={`/products/productdetail/${it.product_id}`}>
                <img src={`${process.env.PUBLIC_URL}/Images/products/${encodeURIComponent(it.product_mainimagepath)}`} alt={it.product_mainimagepath} />
            </Link>
            <div>
                <div>
                    <p className="productName"><Link to={`/products/productdetail/${it.product_id}`}>{it.product_name} <span><i id='star' class="fa-solid fa-star"></i>{it.product_rating.toFixed(1)} (리뷰 {it.review_cnt})</span></Link></p>
                    <p className="productComments">{it.product_description}</p>
                    {it.promotion_discount ? (
                        <p className="productPrice">
                            <span className="originalPrice">{it.product_price.toLocaleString()}원</span>
                            <span>{calcProductPrice(it.product_price, it.promotion_discount).toLocaleString()}원</span>
                            <sup>{`${it.promotion_discount}% 할인`}</sup>
                        </p>
                    ) : (
                        <p className="productPrice">
                            <span>{it.product_price.toLocaleString()}원</span>
                        </p>
                    )}
                </div>
                <div className="gotoCart">
                    <button onClick={() => cartInsertP(it.product_id)} >
                        <img src={process.env.PUBLIC_URL + '/Images/cart.png'} alt="장바구니사진" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;