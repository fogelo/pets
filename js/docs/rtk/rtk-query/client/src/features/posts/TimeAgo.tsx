import { formatDistanceToNow, parseISO } from "date-fns";

interface IProps {
  timestamp: string;
}
const TimeAgo = ({ timestamp }: IProps) => {
  let timeAgo;
  if (timestamp) {
    const date = parseISO(timestamp);
    timeAgo = formatDistanceToNow(date);
  }
  return <span title={timestamp}>{timeAgo}</span>;
};

export default TimeAgo;
