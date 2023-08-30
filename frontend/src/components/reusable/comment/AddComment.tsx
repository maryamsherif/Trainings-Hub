import { useContext, useState } from "react";
import { ReviewStarsContext } from "../../../context/ReviewStarsContext";
import ReviewStars from "../review/ReviewStars";
import CommentAuthorPhoto from "./CommentAuthorPhoto";
import { fetchDataFromAPI } from "../../../utils";
import { Course, Rating, backendSuccessResponse } from "../../../types/types";

export default function AddComment({
  setCourse,
  course,
}: {
  setCourse: (course: Course) => void;
  course: Course;
}) {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const starsContext = useContext(ReviewStarsContext);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      author,
      comment,

      rating: starsContext.currentRating as Rating,
      comment_date_time: new Date().toISOString() as string,
    };
    const data = (await fetchDataFromAPI({
      endpoint: `comment/addComment/${course.id}`,
      configurationOpt: {
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
    })) as backendSuccessResponse<[]>;
    if (data.message === "Success") {
      setComment("");
      setAuthor("");
      setError("");
      starsContext.reset?.();
      setCourse({
        ...course,
        comments: [
          ...course.comments,
          { ...body, id: Math.random().toFixed(2) as unknown as number },
        ],
      });
    } else {
      setError(data.message || "Ops, an error has occurred");
    }
  }
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="relative mt-8 shadow-sm mx-auto max-w-2xl rounded-lg p-2 md:py-6 md:px-4 border-gray-100 border-2"
      >
        <p className="text-gray-500 font-bold mb-6">Add Review:</p>
        <div className="flex gap-2">
          <CommentAuthorPhoto />
          <div className="flex flex-col">
            <div className="flex gap-4 mb-2 items-center">
              <input
                required
                placeholder="Enter your name"
                name="author"
                id="author"
                className="input w-[200px]"
                onChange={({ target: { value } }) => setAuthor(value)}
                value={author}
              />
              <ReviewStars />
            </div>
            <textarea
              required
              placeholder="Enter your comment"
              name="comment"
              id="comment"
              className="resize input max-w-lg max-h-[300px]"
              onChange={({ target: { value } }) => setComment(value)}
              value={comment}
            />
            <button type="submit" className="btn-blue mt-3 flex mx-auto">
              Post
            </button>
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
          </div>
        </div>
      </form>
    </>
  );
}
