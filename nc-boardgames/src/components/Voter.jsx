import { Icon } from "semantic-ui-react";

const Voter = ({
  current_id,
  votes,
  setState,
  patchFunction,
  votedObj,
  setVotedObj,
}) => {
  const changeVotes = (num, id, voteType) => {
    setState((current) => {
      if (!Array.isArray(current)) {
        const newReview = { ...current };
        if (newReview.review_id === current_id) {
          newReview.votes += num;
          updateVotedObj("review_id", current_id, voteType);
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
            updateVotedObj("review_id", current_id, voteType);
          }
        } else if (item.hasOwnProperty("comment_id")) {
          if (item.comment_id === current_id) {
            item.votes += num;
            updateVotedObj("comment_id", current_id, voteType);
          }
        }
      });
      return newResult;
    });
    patchFunction(num, id).then(() => {
      alert("Thanks for your vote!");
    });
  };

  const updateVotedObj = (typeOfId, currentId, voteType) => {
    setVotedObj((currentObj) => {
      const newCurrentObj = { ...currentObj };
      newCurrentObj[`${voteType} ${typeOfId} ${currentId}`] = true;
      return newCurrentObj;
    });
  };

  return (
    <>
      <Icon
        className="reviews__upvote"
        color="grey"
        name="chevron up"
        size="large"
        disabled={
          (current_id &&
            votedObj.hasOwnProperty(`upvote review_id ${current_id}`)) ||
          (current_id &&
            votedObj.hasOwnProperty(`upvote comment_id ${current_id}`))
        }
        onClick={() => {
          changeVotes(1, current_id, "upvote");
        }}
      />
      <p className="reviews__votes">{votes} Votes</p>
      <Icon
        className="reviews__downvote"
        color="grey"
        name="chevron down"
        size="large"
        disabled={
          (current_id &&
            votedObj.hasOwnProperty(`downvote review_id ${current_id}`)) ||
          (current_id &&
            votedObj.hasOwnProperty(`downvote comment_id ${current_id}`))
        }
        onClick={() => {
          changeVotes(-1, current_id, "downvote");
        }}
      />
    </>
  );
};

export default Voter;
