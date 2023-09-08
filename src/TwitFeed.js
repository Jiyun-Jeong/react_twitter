import TwitItem from "./TwitItem";
//피드

const TwitFeed = ({ onRemove, twitList }) => {
  return (
    <ul className="show_twit">
      {twitList.map((it) => (
        <TwitItem key={it.id} {...it} onRemove={onRemove} />
      ))}
    </ul>
  );
};

TwitFeed.defaultProps = {
  twitList: [],
};

export default TwitFeed;
