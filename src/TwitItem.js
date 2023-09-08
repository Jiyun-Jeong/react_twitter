import { useState } from "react";

const TwitItem = ({ onRemove, author, created_date, content, id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState("");

  const handleRemove = () => {
    if (window.confirm(`${id}번째 트윗을 삭제하겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <li className="twit_box">
      <div className="contents">
        <div className="left">
          <img src="" alt=""></img>
        </div>
        <div className="right">
          <div>
            <span className="name">{author}</span>
            <span className="time">{new Date(created_date).toLocaleString()}</span>
          </div>
          <p>
            {isEdit ? (
              <textarea
                value={localContent}
                onChange={(e) => setLocalContent(e.target)}
              ></textarea>
            ) : (
              <>{content}</>
            )}
          </p>
        </div>
      </div>
      <div className="icon_wrap">
        <button className="rewrite" onClick={toggleIsEdit}>
          <span className="hidden">수정하기</span>
        </button>
        <button className="delete" onClick={handleRemove}>
          <span className="hidden">삭제하기</span>
        </button>
        <button className="like">
          <span className="hidden">좋아요</span>
        </button>
      </div>
    </li>
  );
};

export default TwitItem;
