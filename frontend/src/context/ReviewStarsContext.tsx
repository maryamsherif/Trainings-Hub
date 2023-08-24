import { createContext, useReducer } from "react";
import { Rating } from "../types/types";

export type StarsContext = {
  state: StarsState;
  eventHandlers?: EventHandlers;
  reset: () => void;
};

export type EventHandlers = {
  mouseEnter: (rating: Rating) => void;
  mouseLeave: (rating: Rating) => void;
  mouseClick: (rating: Rating) => void;
};

type StarsState = {
  stars: StarReview[];
  currentRating: 1 | 2 | 3 | 4 | 5;
};

export type StarReview = {
  rating: Rating;
  blur: boolean;
  full: boolean;
};

type StarReviewAction = {
  type: "clear" | "hover" | "click" | "reset";
  rating: Rating;
};

function reducerFunction(
  state: StarsState,
  action: StarReviewAction
): StarsState {
  let { stars }: { stars: StarReview[] } = state;

  if (action.type === "clear") {
    stars = stars.map((star) => {
      if (star.rating <= state.currentRating)
        return { ...star, full: true, blur: false };

      return { ...star, full: false, blur: false };
    });
  }
  if (action.type === "hover") {
    stars = stars.map((star) => {
      if (star.rating <= action?.rating)
        return { ...star, full: false, blur: true };

      return { ...star, blur: false, full: false };
    });
  }
  if (action.type === "click") {
    stars = stars.map((star) => {
      if (star.rating <= action?.rating)
        return { ...star, blur: false, full: true };

      return { ...star, blur: false, full: false };
    });

    return {
      stars,
      currentRating: action.rating,
    };
  }

  if (action.type === "reset") return { ...initialState };

  return { ...state, stars };
}

const initialState: StarsState = {
  stars: [
    { rating: 1, blur: false, full: true },
    { rating: 2, blur: false, full: false },
    { rating: 3, blur: false, full: false },
    { rating: 4, blur: false, full: false },
    { rating: 5, blur: false, full: false },
  ],
  currentRating: 1,
};

export const ReviewStarsContext = createContext<StarsContext>(initialState);

export default function ReviewStarsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  function mouseEnter(rating: Rating) {
    dispatch({ type: "hover", rating });
  }
  function mouseLeave(rating: Rating) {
    dispatch({ type: "clear", rating });
  }
  function mouseClick(rating: Rating) {
    dispatch({ type: "click", rating });
  }
  function reset() {
    dispatch({ type: "reset", rating: 1 });
  }
  return (
    <ReviewStarsContext.Provider
      value={{
        state,
        reset,
        eventHandlers: { mouseClick, mouseLeave, mouseEnter },
      }}
    >
      {children}
    </ReviewStarsContext.Provider>
  );
}
