import "./css/app.css";
import React, { useRef, useState, useEffect } from "react";
import TwitWrite from "./TwitWrite";
import TwitFeed from "./TwitFeed";
// import axios from "axios";

//https://jsonplaceholder.typicode.com/comments



function App() {
  const [data, setData] = useState([]);
  //const [mode, setMode] = useState("list");

  const dataId = useRef(0);

  const randomTwit = () => {
    const randomTxt = ["오늘 무두일이래", "무두일이 대체 뭔데", "없을무 우두머리두 날일 써서 우두머리가 없는날....", "개이득?"]
    return randomTxt[Math.floor(Math.random() * randomTxt.length)]
  }

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

    const initData = res.slice(0, 10).map((it) => {
      const emailArray = it.email.split('@');

      return {
        author: emailArray[0],
        content: randomTwit(),
        //time: new Date().getTime(),
        id: dataId.current++
      };
    });

    setData(initData);
  }

  useEffect(() => {
    getData();

    // axios.get("https://cataas.com/cat").then((res) => {
    //   setData(res.data.results.map(user => ({
    //     image: user.picture.thumbnail
    //   })))
    // })
  },[])

  const onCreate = (author, content, image) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      created_date,
      content,
      image,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newTwitList = data.filter((it) => it.id !== targetId);
    setData(newTwitList);
  };

  // useEffect(() => {
  //   axios.get("https://cataas.com/cat").then((res) => {
  //     setData(res.data.results.map(user => ({
  //       content: randomTwit(),
  //       image: user.picture.thumbnail
  //     })))
  //   })
  // }, [])

  return (
    <div className="app">
      <header>
        <h1>
          <span className="hidden">트위터</span>
        </h1>
      </header>
      <section>
        <div className="container">
          <TwitWrite onCreate={onCreate} />
          <TwitFeed onRemove={onRemove} twitList={data} />
          <button className="twit">
            <span className="hidden">트윗하기</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
