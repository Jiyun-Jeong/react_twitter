import "./css/app.css";
import React, { useRef, useState, useEffect } from "react";
import TwitWrite from "./TwitWrite";
import TwitFeed from "./TwitFeed";
// import axios from "axios";

//https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]); // 트윗 목록 저장
  const [mode, setMode] = useState("list"); // write | list 모드에 따라 내용이 바뀜

  const dataId = useRef(0);

  const randomTwit = () => {
    const randomTxt = [
      "오늘 무두일이래",
      "무두일이 대체 뭔데",
      "없을무 우두머리두 날일 써서 우두머리가 없는날....",
      "개이득?",
    ];
    return randomTxt[Math.floor(Math.random() * randomTxt.length)];
  };

  //api 10개만 사용
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    console.log(res);

    const initData = res.slice(0, 10).map((it) => {
      const emailArray = it.email.split("@");

      return {
        author: emailArray[0],
        content: randomTwit(),
        //time: new Date().getTime(),
        id: dataId.current++,
        image: "https://cataas.com/cat/zPHzhfP1n01EMfKy",
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = async (author, content, image) => {
    const catApiUrl = "https://cataas.com";
    const catList = await fetch(catApiUrl + "/cat?json=true")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const catUrl = catApiUrl + response.url;

        const created_date = new Date().getTime();
        const newItem = {
          author,
          created_date,
          id: dataId.current,
          image: catUrl,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
      });
  };

  const onRemove = (targetId) => {
    const newTwitList = data.filter((it) => it.id !== targetId);
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
          {mode === "write" ? <TwitWrite onCreate={onCreate} /> : ""}
          <button className="twit">
            <span className="hidden">트윗하기</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
