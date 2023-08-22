import { CourseComment } from "../../../types/types";
import Comment from "./Comment";

export default function CommentList({
  comments,
}: {
  comments: CourseComment[];
}) {
  let results;
  if (!comments.length) {
    results = (
      <p className="text-center text-sm text-gray-600">
        No comments yet. Be the first to comment!
      </p>
    );
  } else {
    results = comments.map((comment) => (
      <Comment key={comment.id} comment={comment}></Comment>
    ));
  }
  return (
    <section className="">
      <h4 className="block w-full text-lg font-bold text-gray-700">Review:</h4>
      <div className="flex flex-wrap gap-2">{results}</div>
    </section>
  );
}
