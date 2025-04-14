import { DataFetchState } from "../../../domain/entities/data-fetch-state.entity";
import { Tweet } from "../../../domain/entities/tweet.entity";
import ErrorComponent from "../../common/error-component/error.component";
import TweetCard from "../../tweet/tweet-card.component";

type Props = {
  tweets: DataFetchState<Tweet[]>;
};

const TweetsGrid = ({ tweets }: Props) => {
  if (tweets.error) return <ErrorComponent error={tweets.error} />;
  if (!tweets.data || tweets.loading)
    return <div className="text-white">Loading tweets</div>;
  if (tweets.data.length === 0)
    return <div className="text-white">No tweets found</div>;

  // Reverse the order of the tweets
  const reversedTweets = [...tweets.data].reverse();

  return (
    <div className="grid grid-cols-2 gap-6">
      {reversedTweets.map((tweet, idx) => (
        <TweetCard key={idx} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetsGrid;
