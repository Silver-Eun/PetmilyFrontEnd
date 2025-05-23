import React from "react";
import axios from "axios";

function CartItem({ checkedItems, cartItems, nothing, setNothing, checkChange, calcProductPrice, }) {
  // 장바구니 상품 삭제
  function cDelete(user_id, product_id) {
    let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rscart/cdelete/" + user_id + "/" + product_id;

    axios
      .delete(url)
      .then(() => {
        setNothing(nothing + 1);
      })
      .catch(() => {
        alert("상품 삭제에 실패했습니다.");
      });
  }

  // cartCntUp(장바구니 수량 +1)
  function upCnt(product_id, item) {
    let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rscart/cartCntUp/" + product_id;

    if (item.product_cnt < 100) {
      axios
        .post(url)
        .then(() => {
          setNothing(nothing + 1);
        })
        .catch(() => {
          alert("수량 변경에 실패했습니다.")
        });
    } else {
      alert("최대 수량은 100입니다");
    }
  }

  // cartCntDown(장바구니 수량 -1)
  function downCnt(product_id, item) {
    let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rscart/cartCntDown/" + product_id;

    if (item.product_cnt > 1) {
      axios
        .post(url)
        .then(() => {
          setNothing(nothing + 1);
        })
        .catch(() => {
          alert("수량 변경에 실패했습니다.")
        });
    } else {
      alert("최소 수량은 1입니다");
    }
  }

  return (
    <tbody>
      {cartItems.map((item) => (
        <tr>
          <td>
            <input
              type="checkbox"
              checked={checkedItems.includes(item.product_id)}
              onChange={(e) => checkChange(e, item.product_id)}
            />
          </td>
          <td>
            <div className="cartImage">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/Images/products/${item.product_mainimagepath}`
                }
                alt={item.product_mainimagepath}
              />
            </div>
          </td>
          <td>
            <span>{item.product_name}</span>
          </td>
          <td>
            <span>
              {calcProductPrice(item.product_price, item.promotion_discount).toLocaleString()}
            </span>
          </td>
          <td>
            <button
              className="decreQuantity"
              onClick={() => {
                downCnt(item.product_id, item);
              }}
            >
              ▽
            </button>
            <span>{item.product_cnt}</span>
            <button
              className="increQuantity"
              onClick={() => {
                upCnt(item.product_id, item);
              }}
            >
              △
            </button>
          </td>
          <td>
            <span>
              {(calcProductPrice(item.product_price, item.promotion_discount) *item.product_cnt).toLocaleString()}
            </span>
          </td>
          <td>
            <button
              type="button"
              id="deleteCartProduct"
              name="deleteCartProduct"
              class="textlink"
              onClick={() => {
                cDelete(item.user_id, item.product_id);
              }}
            >
              삭제
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default CartItem;