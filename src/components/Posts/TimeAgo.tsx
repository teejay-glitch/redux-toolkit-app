import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

interface TimeAgoProps {
  time: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ time }: TimeAgoProps) => {
  let timeAgo = "";

  if (time) {
    const date = parseISO(time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
