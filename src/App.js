import "./css/App.css";
import React, { useRef, useState, useEffect } from "react";
import WriteTwit from "./WriteTwit";
import TwitFeed from "./TwitFeed";

function App() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("list");

  const dataId = useRef(0);

  const onCreate = (author, content) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      created_date,
      content,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newTwitList = data.filter((it) => it.id !== targetId);
    console.log(newTwitList);
    setData(newTwitList);
  };

  return (
    <div className="app">
      <header>
        <h1>
          <span className="hidden">트위터</span>
        </h1>
      </header>
      <section>
        <div className="container">
          <TwitFeed onRemove={onRemove} twitList={data} />
          {/* <WriteTwit onCreate={onCreate} /> */}
          <button className="twit">
            <span className="hidden">트윗하기</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
