import { useAppSelector } from "../../../../store/hooks";
import { selectCurrentPostComments } from "../../../../store/slices/posts.slice";
import CommentCard from "../comment-card/comment-card.component";

const CommentsGrid = () => {
  const comments = useAppSelector(selectCurrentPostComments);

  if (comments.loading)
    return <div className="text-white">Loading comments</div>;
  if (comments.data.length === 0)
    return <div className="text-white">No comments found</div>;
  if (comments.error)
    return <div className="text-white">Something went wrong</div>;

  // Reverse the order of the tweets
  const reversedComments = [...comments.data].reverse();

  return (
    <div className="grid grid-cols-1 gap-4">
      {reversedComments.map((comment, idx) => (
        <CommentCard comment={comment} key={idx} />
      ))}
    </div>
  );
};

export default CommentsGrid;
