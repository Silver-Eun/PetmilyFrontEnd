import './Introduce.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';

import ProductItem from '../Products/ProductItem';

function Introduce({ props, calcProductPrice, addCart }) {
    const [productData, setProductData] = useState([]);

    let url = '';

    useEffect(() => {
        if (props[1] === 0) {
            url = 'newProductList';
        }
        else if (props[1] === 1) {
            url = 'popularProductList';
        }
        else {
            url = 'discountedProductList';
        }

        axios.get(`https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsproduct/${url}`)
            .then((response) => {
                setProductData(response.data);
            })
            .catch(() => {
                alert("productData 불러오기에 실패했습니다.");
            });
    }, [props]);

    return (
        <div className="Introduce">
            <hr />
            <div className="introducebox">
                <div>
                    <span>{props[0].title}</span>
                    <Link to={`${props[0].url}`}>+</Link>
                </div>

                <div>
                    <p>{props[0].content}<br /></p>
                </div>
            </div>

            <div className="productList">
                {productData.map((item, idx) => {
                    if (idx < 3) return (<ProductItem key={item.id} it={item} calcProductPrice={calcProductPrice} addCart={addCart} />);
                })}
            </div>
        </div>
    );
}

export default Introduce;