import classNames from "classnames";
import { EventHandlers, StarReview } from "../../../context/ReviewStarsContext";

export default function StarIcon({
  star,
  eventHandlers,
}: {
  star: StarReview | null;
  eventHandlers: EventHandlers | null;
}) {
  function handleMouseEnter() {
    if (eventHandlers && star) eventHandlers.mouseEnter(star.rating);
  }
  function handleMouseLeave() {
    if (eventHandlers && star) eventHandlers.mouseLeave(star.rating);
  }
  function handleMouseClick() {
    if (eventHandlers && star) eventHandlers.mouseClick(star.rating);
  }
  // = "text-gray-400" | "text-yellow-400";
  return (
    <svg
      className={classNames("w-4 h-4", {
        "text-yellow-400/50": star?.blur,
        "text-yellow-400": star?.full,
        "text-gray-400": star?.full === false && star?.blur === false,
      })}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
}
