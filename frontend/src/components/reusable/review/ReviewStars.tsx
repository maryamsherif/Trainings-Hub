import { useContext } from "react";
import {
  EventHandlers,
  ReviewStarsContext,
} from "../../../context/ReviewStarsContext";
import StarIcon from "../icons/StarIcon";

export default function ReviewStars() {
  const { eventHandlers, stars, currentRating } =
    useContext(ReviewStarsContext);
  const starsList = stars.map((star) => (
    <StarIcon
      key={star.rating}
      star={star}
      eventHandlers={eventHandlers as EventHandlers}
    />
  ));
  return (
    <div className="flex items-center space-x-1">
      {starsList}
      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {currentRating} out of 5
      </p>
    </div>
  );
}
