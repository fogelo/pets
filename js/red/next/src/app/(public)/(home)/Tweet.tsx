import { PAGES } from "@/config/pages.config";
import { ITweet } from "@/shared/types/tweet.interface";
import Link from "next/link";
import React from "react";

interface Props {
  tweet: ITweet;
}
const Tweet = ({ tweet }: Props) => {
  return (
    <div>
      <Link href={PAGES.PROFILE(tweet.author)}>{tweet.author}</Link>
      <p>{tweet.text}</p>
    </div>
  );
};

export default Tweet;
