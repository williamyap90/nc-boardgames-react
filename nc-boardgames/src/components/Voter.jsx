import { Icon } from "semantic-ui-react";

const Voter = ({ current_id, votes, setState, patchFunction }) => {
  const changeVotes = (num, id) => {
    setState((current) => {
      if (!Array.isArray(current)) {
        const newReview = { ...current };
        if (newReview.review_id === current_id) {
          newReview.votes += num;
        }
        return newReview;
      }

      const newResult = current.map((currentItem) => {
        return (currentItem = { ...currentItem });
      });
      newResult.forEach((item) => {
        if (item.hasOwnProperty("review_id")) {
          if (item.review_id === current_id) {
            item.votes += num;
          }
        } else if (item.hasOwnProperty("comment_id")) {
          if (item.comment_id === current_id) {
            item.votes += num;
          }
        }
      });
      return newResult;
    });
    patchFunction(num, id).then(() => {
      alert("Thanks for your vote!");
    });
  };

  return (
    <>
      <div
        className="reviews__upvote"
        onClick={() => {
          changeVotes(1, current_id);
        }}
      >
        <Icon color="grey" name="chevron up" size="large" />
      </div>
      <p className="reviews__votes">{votes} Votes</p>
      <div
        className="reviews__downvote"
        onClick={() => {
          changeVotes(-1, current_id);
        }}
      >
        <Icon color="grey" name="chevron down" size="large" />
      </div>
    </>
  );
};

export default Voter;
