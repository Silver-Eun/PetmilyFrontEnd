import styles from "./EventItem.module.css";function EventItem({ it }) {
  let progress = "";
  let isGoing = "";

  const currentDate = new Date();

  if (currentDate < new Date(it.event_start)) {
    progress = "beforeOpen";
    isGoing = "진행전";
  } else if (currentDate <= new Date(it.event_end)) {
    progress = "onGoing";
    isGoing = "진행중";
  } else {
    progress = "closed";
    isGoing = "마감";
  }

  return (
    <div className={styles["events"] + " " + styles[progress]}>
            <div>
                <img src={process.env.PUBLIC_URL + `/Images/event/${it.event_imagepath}`} alt="이벤트 사진" />

                <div>
                    <p className={styles["eventTitle"]}>{it.event_name}</p>
                    <p className={styles["eventContent"]}>{it.event_description}</p>

                    <div className={styles["eventInfo"]}>
                        <span>
                            {isGoing}
                        </span>
                        <h5>
                            {new Date(it.event_start).toLocaleDateString()} ~ {new Date(it.event_end).toLocaleDateString()}
                        </h5>
                    </div>
                </div>
            </div>
        </div>);

};

export default EventItem;