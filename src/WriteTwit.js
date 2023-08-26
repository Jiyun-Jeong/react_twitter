import React, { useRef, useState } from "react";

//트윗 작성 페이지
const WriteTwit = ({ onCreate }) => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
  });

  const HandleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitTwit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content);
    alert("트윗했어요!");
    setState({
      author: "",
      content: "",
    });
  };

  return (
    <div className="write_twit">
      <h2 className="hidden">트윗 작성하기</h2>
      <input
        ref={authorInput}
        value={state.author}
        name="author"
        placeholder="작성자"
        onChange={HandleChangeState}
      />
      <textarea
        ref={contentInput}
        value={state.content}
        name="content"
        placeholder="무슨 일이 일어나고 있나요?"
        onChange={HandleChangeState}
      ></textarea>
      <div className="btn_wrap">
        <button className="confirm" onClick={SubmitTwit}>
          트윗하기
        </button>
        <button className="cancle">취소하기</button>
      </div>
    </div>
  );
};

export default WriteTwit;
