import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../store/hooks";
import { TweetBase } from "../../../../domain/entities/tweet.entity";
import { postComment, postTweet } from "../../../../store/thunks/posts.thunk";
import classNames from "classnames";

const PostComment = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TweetBase>();

  const onSubmit: SubmitHandler<TweetBase> = async (data) => {
    await dispatch(postComment(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>

        <textarea
          {...register("content", {
            required: "Content is required.",
            minLength: {
              value: 2,
              message: "Content must be atleast 2 charachters long.",
            },
            maxLength: {
              value: 300,
              message: "Content cannot be greater than 300 charhters.",
            },
          })}
          className={classNames(
            "px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800",
            errors.content
              ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  focus:border-red-500"
              : ""
          )}
          rows={6}
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex disabled:animate-pulse items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange_(web)-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
  );
};

export default PostComment;
