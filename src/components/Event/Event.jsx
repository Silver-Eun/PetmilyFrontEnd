import "./Event.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';

import EventItem from "./EventItem";

function Event() {
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        axios.get('https://port-0-petmilyreal-1272llwrbm1kq.sel5.cloudtype.app/api/rsproduct/eventList')
            .then((response) => {
                setEventData(response.data);
            })
            .catch(() => {
                alert("이벤트 목록 조회에 실패했습니다.");
            });
    }, []);

    const [selectedFilter, setSelectedFilter] = useState("all");
    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const currentDate = new Date();

    const filteredData = eventData
        ? eventData.filter(item => {
            if (selectedFilter === "all") return true;
            if (selectedFilter === "onGoing") return currentDate >= new Date(item.event_start) && currentDate <= new Date(item.event_end);
            if (selectedFilter === "closed") return currentDate > new Date(item.event_end);
            if (selectedFilter === "beforeOpen") return currentDate < new Date(item.event_start);
            return true;
        })
        : [];

    return (
        <div className="Event">
            <div className="cateTitle">
                <h1>이벤트</h1>
            </div>
            <hr />

            <div id="eventBox">
                <div id="eventTop">
                    <span>펫밀리의 이벤트와 혜택을 알아보세요!</span>
                    <select name="searchPeriod" onChange={handleFilterChange}>
                        <option value="all">전체목록</option>
                        <option value="onGoing">진행중</option>
                        <option value="closed">마감</option>
                        <option value="beforeOpen">진행전</option>
                    </select>
                </div>

                <div id="eventList">
                    {filteredData.map(item => (<EventItem key={item.event_id} it={item} />))}
                </div>
            </div>
        </div>
    );
}

export default Event;