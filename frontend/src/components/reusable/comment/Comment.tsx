import { CourseComment } from "../../../types/types";
import { convertIsoString } from "../../../utils";
import CommentAuthorPhoto from "./CommentAuthorPhoto";

export default function Comment({ comment }: { comment: CourseComment }) {
  return (
    <div className="relative shadow-sm rounded-lg flex gap-2 min-w-[25rem] p-2 md:py-6 md:px-4 border-gray-100 border-2">
      <CommentAuthorPhoto />
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <span className="text-md max-w-[10rem] truncate text-gray-700 font-bold">
              {comment.author}
            </span>
            <span className="text-md text-gray-500 pl-1">
              {comment.rating} ⭐️
            </span>
          </div>
          <p className="text-sm text-gray-500 pl-1 line-clamp-2">
            {comment.comment}
          </p>
          <span className="absolute top-1 right-2 text-[10px] text-gray-500">
            🗓️ {convertIsoString(comment.comment_date_time)}
          </span>
        </div>
      </div>
    </div>
  );
}
