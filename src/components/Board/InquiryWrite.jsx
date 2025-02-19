import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function InquiryWrite() {
    const [searchResult, setSearchResult] = useState([]); // 검색한 값이 db에 있으면 searchResult에 저장한다.
    const [productByKind, setProductByKind] = useState([]); // kind 선택한 값에 대한 상품정보
    const [selectedValue, setSelectedValue] = useState('');
    const [kind, setKind] = useState('all');

    const navigate = useNavigate();

    const isLoggedIn =
        sessionStorage.getItem("loggedInUser");
    const user = isLoggedIn ? JSON.parse(isLoggedIn) : null;
    const userName = user ? user.user_name : ''; // 유저 이름 변수

    const inquirySubmit = async () => {

        if (!selectedValue) {
            alert("상품명을 선택해주세요.");
            return;
        }

        const inquiryTitleInput = document.querySelector('input[id="inquiry_title"]');
        const inquiryTitle = inquiryTitleInput.value.trim();

        if (!inquiryTitle) {
            alert("제목을 입력하세요.");
            return;
        }
        let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/inquiry/insert";

        await axios({
            url: url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                inquiry_title: document.getElementById('inquiry_title').value,
                inquiry_writer: document.getElementById('inquiry_writer').value,
                product_id: document.getElementById('product_id').value,
                inquiry_content: document.getElementById('inquiry_content').value
            }

        }).then(response => {
            alert("상품문의 등록 완료되었습니다.");
            navigate('/community/inquiry');
        }).catch(() => {
            alert("상품문의 등록에 실패했습니다.");
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/product/search?name=`);
                setSearchResult(response.data);
            } catch (error) {
                alert("데이터를 불러오는 중에 오류가 발생했습니다.");
            }
        };

        fetchData();
    }, [selectedValue]);

    const fetchData = async () => {
        const searchInput = document.getElementById('searchInput').value;

        try {
            const response = await axios.get(`https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/product/search?name=${searchInput}`);
            setSearchResult(response.data);
        } catch (error) {
            alert("찾으시는 상품이 없습니다.");
        }
    };

    const handleSelectChange = (event) => {
        const selectedProductId = event.target.value; // select 태그의 option 중 해당하는 상품명을 변수에 담는다.
        setSelectedValue(selectedProductId);
    };

    const handleKindChange = async (event) => {
        const selectedKind = event.target.value;
        setKind(selectedKind);

        try {
            const response = await axios.get(`https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/product/kind/${selectedKind}`);
            const { product, kinds } = response.data;

            const formattedData = Object.values(kinds).map(category => ({
                product_category: category
            }));

            setProductByKind(formattedData);
            setSearchResult(Object.values(product));
        } catch (error) {
            alert("카테고리 데이터 불러오기에 실패했습니다.");
        }
    };

    const handleCategoryChange = async (event) => {
        const selectedCategory = event.target.value;

        try {
            const response = await axios.get(`https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/product/category/${kind}/${selectedCategory}`);
            setSearchResult(response.data);
        } catch (error) {
            alert("카테고리 데이터 불러오기에 실패했습니다.");
        }
    };

    return (
        <div className="write">
            <div className="cateTitle">
                <h1>상품문의</h1>
            </div>

            <div>
                <div className="selectStarRegist">
                    <input type="text" id="searchInput" onChange={fetchData} placeholder="상품명을 입력하세요." required />
                    <div id="searchResult" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <select id="product_kind" onChange={handleKindChange} style={{width: '150px'}}>
                            <option value="all">종류</option>
                            <option value="dog">강아지</option>
                            <option value="cat">고양이</option>
                        </select>
                        <select id="product_category" onChange={handleCategoryChange} style={{ width: '150px' }}>
                            <option value="all">카테고리</option>
                            {productByKind.map((result, index) => (
                                <option key={index} >
                                    {result.product_category}
                                </option>
                            ))}
                        </select>
                        <select id="product_id" value={selectedValue} onChange={handleSelectChange} style={{ width: '150px' }}>
                            <option value="">상품</option>
                            {searchResult.map((result, index) => (
                                <option key={index} value={result.product_id} >
                                    {result.product_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div id="registButton">
                        <input onClick={inquirySubmit} value="등록" />
                    </div>
                </div>

                <div>
                    <form>
                        <input id="inquiry_title" type="text" placeholder="제목을 입력하세요." maxLength="100" required />
                        <textarea id="inquiry_content" rows="30" cols="100"></textarea>
                        <input type='hidden' id='inquiry_writer' value={userName} />
                        <input type='hidden' id='product_id' value={selectedValue ? selectedValue.toString() : ''} />
                    </form>
                </div>
            </div>

            <div id="bottomBoard">
                <Link to="/community/inquiry">
                    <input type="button" value="목록" />
                </Link>
            </div>
        </div>
    );
}