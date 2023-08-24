import { useContext } from "react";
import { ReviewStarsContext } from "../../../context/ReviewStarsContext";
import StarIcon from "../icons/StarIcon";

export default function ReviewStars() {
  const { eventHandlers, state } = useContext(ReviewStarsContext);
  const stars = state.stars.map((star) => (
    <StarIcon key={star.rating} star={star} eventHandlers={eventHandlers} />
  ));
  return (
    <div className="flex items-center space-x-1">
      {stars}
      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        {state.currentRating} out of 5
      </p>
    </div>
  );
}
