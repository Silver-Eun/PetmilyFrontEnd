import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import ProductItem from "./ProductItem";

function PromotionProducts({ calcProductPrice, sortProducts, addCart }) {
    const { id } = useParams();
    const [promotionInfoData, setPromotionInfoData] = useState([]);
    const [promotionProductData, setPromotionProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoResponse = await axios.get('https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsproduct/promotionInfoList');
                setPromotionInfoData(infoResponse.data);

                const productResponse = await axios.get(`https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsproduct/promotionProductList/${id}`);
                setPromotionProductData(productResponse.data);
            } catch (err) {
                alert("프로모션 상품 불러오기에 실패했습니다.")
            }
        };

        fetchData();
        handleSort("newest");

    }, [id]);

    // 정렬
    const [sortOption, setSortOption] = useState("default");

    const handleSort = (option) => {
        setSortOption(option);
    };

    const currentItems = sortProducts(promotionProductData, sortOption);

    return (
        <div className="Products">
            <div className="cateTitle">
                <h1>{promotionInfoData.length > 0 && promotionInfoData[id - 1].promotion_name}</h1>
            </div>
            <hr />

            <div className="sortButtons">
                <button className={sortOption === "newest" ? "active" : ""} onClick={() => handleSort("newest")}>최신 등록일순</button>
                <button className={sortOption === "highToLow" ? "active" : ""} onClick={() => handleSort("highToLow")}>가격 높은순</button>
                <button className={sortOption === "lowToHigh" ? "active" : ""} onClick={() => handleSort("lowToHigh")}>가격 낮은순</button>
                <button className={sortOption === "HighAvgStar" ? "active" : ""} onClick={() => handleSort("HighAvgStar")}>평점 높은순</button>
                <button className={sortOption === "HighCntReview" ? "active" : ""} onClick={() => handleSort("HighCntReview")}>리뷰 많은순</button>
            </div>

            <div className="productList">
                {currentItems.map((item) => (<ProductItem key={item.product_id} it={item} calcProductPrice={calcProductPrice} addCart={addCart} />))}
            </div>
        </div>
    );
}

export default PromotionProducts;