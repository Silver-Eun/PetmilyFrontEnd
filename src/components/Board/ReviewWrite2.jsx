import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Star from "./Star";

export default function ReviewWrite() {
    const { id, key } = useParams();
    const [productData, setProductData] = useState([]);

    // 상품후기의 별점 수
    const [score, setScore] = useState(0);
    const onChangeScore = (data) => {
        setScore(data);
    }

    const navigate = useNavigate();

    const isLoggedIn =
        sessionStorage.getItem("loggedInUser");
    const user = isLoggedIn ? JSON.parse(isLoggedIn) : null;
    const userName = user ? user.user_name : null;

    const reviewSubmit = async () => {
        const selectedFilesInput = document.querySelector('input[type="file"]');
        const selectedFiles = selectedFilesInput.files;

        if (selectedFiles.length !== 2) {
            alert("후기 작성시에 이미지는 반드시 2장을 업로드해야 합니다.");
            return;
        }

        const reviewTitleInput = document.querySelector('input[name="review_title"]');
        const reviewTitle = reviewTitleInput.value.trim();

        if (!reviewTitle) {
            alert("제목을 입력하세요.");
            return;
        }

        let formData = new FormData(document.getElementById('reviewForm'));

        await axios.post(
            "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/review/insert",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data" 
                }
            }
        ).then(
            response => {
                alert(response.data);
                navigate('/community/review');
            }
        ).catch(() => {
            alert("등록에 실패했습니다.")
        });
    }

    const getProductData = () => {
        axios.get(`https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsproduct/productDetail/${id}`)
            .then((response) => {
                setProductData(response.data);
            })
            .catch(() => {
                alert("productDetail 로드 실패");
            });
    };

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <div className="write">
            <div className="cateTitle">
                <h1>상품후기</h1>
            </div>

            <div>
                <div className="selectStarRegist">
                    <span>상품명 : {productData.product_name}</span>

                    <div className="productRating">
                        <Star onChangeScore={onChangeScore} />
                    </div>

                    <div id="registButton">
                        <input onClick={reviewSubmit} value="등록" />
                    </div>
                </div>

                <div>
                    <form id="reviewForm">
                        <input name="review_title" type="text" placeholder="제목을 입력하세요." maxlength="100" required />

                        <input type="file" name="uploadfile1" multiple accept="image/gif,image/jpeg,image/png"
                            onChange={(e) => {
                                const selectedFiles = Array.from(e.target.files).slice(0, 2); // 최대 2개의 파일 선택
                                console.log(selectedFiles);
                            }}
                        />

                        <input type="hidden" name="review_point" value={score} />
                        <input type="hidden" name="product_id" value={id} />
                        <input type="hidden" name="review_writer" value={userName} />
                        <input type="hidden" name="order_key" value={key} />
                        <input type="hidden" name="user_id" value={user.user_id} />

                        <textarea name="review_content" rows="30" cols="100"></textarea>
                    </form>
                </div>
            </div>

            <div id="bottomBoard">
                <Link to="/community/review"><input type="button" value="목록" /></Link>
            </div>
        </div>
    )
}