import "./ManageBoard.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <a
        key={i}
        href="#"
        className={i === currentPage ? "active" : ""}
        onClick={() => onPageChange(i)}
      >
        {i}
      </a>
    );
  }

  return (
    <div className="paginations">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      {pages}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
}

function ManageInquiry() {
  const [inquiry, setInquiry] = useState([]);
  const [searchPeriod, setSearchPeriod] = useState("all");
  const [searchCriteria, setSearchCriteria] = useState("subject");
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rscart/inquiry/list", {
          params: {
            searchPeriod,
            searchCriteria,
            searchWord,
          },
        });
        setInquiry(response.data);
      } catch (error) {
        alert(`작성글이 없습니다.`);
      }
    };
    fetchData();
  }, [searchPeriod, searchCriteria, searchWord]);

  function AnswerCheck(inquiry) {
    if (inquiry.answer_content != null) {
      return <td style={{ color: "blue" }}>답변완료</td>;
    } else {
      return <td style={{ color: "red" }}>확인중</td>;
    }
  }

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return inquiry.slice(startIndex, endIndex);
  };

  // const { id } = useParams();

  let contents = inquiry.inquiry_content;

  function inquiryDelete(id) {
    let url = "https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/inquiry/delete/" + id;
    axios
      .delete(url)
      .then(() => {
        alert("상품문의가 삭제 되었습니다.");
        window.location.reload();
      })
      .catch(() => {
        alert("상품문의 삭제에 실패했습니다.");
      });
  }

  if (contents != null) {
    contents = inquiry.inquiry_content.split("\n").map((it) => <p>{it}</p>);
  }

  return (
    <div className="Inquiry">
      <div className="cateTitle">
        <h1>상품문의</h1>
      </div>
      <div className="communityList">
        <ul>
          <li>
            <Link to="/user/mypage/manageBoard/inquiry">상품문의</Link>
          </li>
          <li>
            <Link to="/user/mypage/manageboard/review">상품후기</Link>
          </li>
        </ul>
      </div>

      <div className="boards">
        <table>
          <colgroup>
            <col style={{ width: 100 }} />
            <col style={{ width: 280 }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: 150 }} />
            <col style={{ width: 120 }} />
            <col style={{ width: 130 }} />
            <col style={{ width: 130 }} />
          </colgroup>
          <tr>
            <th>제목</th>
            <th>상품명</th>
            <th>답변여부</th>
            <th>글쓴이</th>
            <th>작성일</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
          {/* 데이터 매핑 */}
          {paginatedData().map((i) => (
            <tr key={i.inquiry_id}>
              <td>
                <Link to={`./${i.inquiry_id}`}>{i.inquiry_title}</Link>
              </td>
              <td>{i.product_name}</td>
              {AnswerCheck(i)}
              <td>{i.inquiry_writer}</td>
              <td>{i.inquiry_regdate}</td>
              <td>
                <Link to={`/board/inquiryUpdate/${i.inquiry_id}`}>
                  <input
                    type="button"
                    id="updateButton"
                    name="updateButton"
                    value="수정"
                  />
                </Link>
              </td>
              <td>
                <input
                  onClick={() => {
                    inquiryDelete(i.inquiry_id);
                  }}
                  type="button"
                  id="deleteButton"
                  name="deleteButton"
                  value="삭제"
                />
              </td>
            </tr>
          ))}
        </table>
        {/* 페이지네이션 UI */}
        <Pagination
          totalPages={Math.ceil(inquiry.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ManageInquiry;