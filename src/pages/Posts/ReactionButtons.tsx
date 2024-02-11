import React from "react";
import { Post, Reaction } from "../../models/Post";
import { useDispatch } from "react-redux";
import { reactionAddedAsync } from "../../app/features/postsAsync/postAsyncSlice";

const ReactionEmoji = {
  thumbsUp: "👍",
  wow: "🤩",
  heart: "❤",
  rocket: "🚀",
  coffee: "☕",
};

interface ReactionButtonsProps {
  post: Post;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  post,
}: ReactionButtonsProps) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(ReactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAddedAsync({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name as keyof Reaction]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
