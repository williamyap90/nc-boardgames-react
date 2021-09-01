import { Icon } from "semantic-ui-react";
import { patchVotes } from "../Api";

const Voter = ({ review_id, votes, setReviewState }) => {
  const changeReviewVotes = (num, id) => {
    setReviewState((currentReviews) => {
      if (!Array.isArray(currentReviews)) {
        const newReview = { ...currentReviews };
        if (newReview.review_id === review_id) {
          newReview.votes += num;
        }
        return newReview;
      }

      const newReviews = currentReviews.map((review) => {
        return (review = { ...review });
      });
      newReviews.forEach((review) => {
        if (review.review_id === review_id) {
          review.votes += num;
        }
      });
      return newReviews;
    });
    patchVotes(num, id).then((data) => {
      alert("Thanks for your vote!");
    });
  };

  return (
    <>
      <div
        className="reviews__upvote"
        onClick={() => {
          changeReviewVotes(1, review_id);
        }}
      >
        <Icon color="grey" name="caret up" size="huge" />
      </div>
      <p className="reviews__votes">{votes} Votes</p>
      <div
        className="reviews__downvote"
        onClick={() => {
          changeReviewVotes(-1, review_id);
        }}
      >
        <Icon color="grey" name="caret down" size="huge" />
      </div>
    </>
  );
};

export default Voter;
