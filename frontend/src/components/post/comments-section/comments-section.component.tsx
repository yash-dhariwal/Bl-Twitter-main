import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectCurrentPost } from "../../../store/slices/posts.slice";
import CommentsGrid from "./comments-grid/comments-grid.component";
import PostComment from "./post-comment/post-comment.component";
import { fetchPostComments } from "../../../store/thunks/posts.thunk";

const CommentsSection = () => {
  const currentPost = useAppSelector(selectCurrentPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentPost.data) {
      dispatch(fetchPostComments());
    }
  }, [currentPost]);

  return (
    <section className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion (
          {Number(currentPost.data ? currentPost.data.commentsCount : 0)})
        </h2>
      </div>
      <PostComment />
      <CommentsGrid />
    </section>
  );
};

export default CommentsSection;
