import './ImageSlider.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ImageSlider() {
    const [promotionInfoData, setPromotionInfoData] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        axios.get('https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsproduct/promotionInfoList')
            .then((response) => {
                setPromotionInfoData(response.data);
                })
            .catch(() => {
                alert("프로모션 불러오기에 실패했습니다.");
            });
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % promotionInfoData.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? promotionInfoData.length - 1 : prevIndex - 1
        );
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, [promotionInfoData]);

    return (
        <div className="ImageSlider">
            {promotionInfoData.length > 0 && (
                <div className="slider-container">
                    {promotionInfoData.map((product, index) => (
                        <Link to={`/products/promotionproducts/${product.promotion_id}`} key={product.promotion_id}>
                            <div
                                className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => goToImage(index)}
                            >
                                <img src={process.env.PUBLIC_URL + `/Images/promotion/${product.promotion_image}`} alt={`Slide ${index}`} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="slider-controls">
                <button className="prev-button" onClick={prevImage}>
                    &#x2039;
                </button>
                <div className="dots">
                    {promotionInfoData.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => goToImage(index)}
                        />
                    ))}
                </div>
                <button className="next-button" onClick={nextImage}>
                    &#x203a;
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;