import TwitItem from "./TwitItem";
//피드

const TwitFeed = ({ onRemove, twitList }) => {
  return (
    <div className="show_twit">
      {twitList.map((it) => (
        <TwitItem key={it.id} {...it} onRemove={onRemove} />
      ))}
    </div>
  );
};

TwitFeed.defaultProps = {
  twitList: [],
};

export default TwitFeed;
