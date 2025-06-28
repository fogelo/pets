import { TWEETS } from "@/shared/data/twets.data";
import Tweet from "./Tweet";

export default function Home() {
  return (
    <div className="">
      <div className="space-y-6">
        {TWEETS.map((tweet) => (
          <Tweet
            key={tweet.author}
            tweet={{ author: tweet.author, text: tweet.text }}
          />
        ))}
      </div>
    </div>
  );
}
