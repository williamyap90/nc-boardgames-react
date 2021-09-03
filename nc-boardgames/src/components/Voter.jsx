import { Icon } from "semantic-ui-react";

const Voter = ({
  current_id,
  votes,
  setState,
  patchFunction,
  votedObj,
  setVotedObj,
}) => {
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
            updateVotedObj("review_id", current_id);
          }
        } else if (item.hasOwnProperty("comment_id")) {
          if (item.comment_id === current_id) {
            item.votes += num;
            updateVotedObj("comment_id", current_id);
          }
        }
      });
      return newResult;
    });
    patchFunction(num, id).then(() => {
      alert("Thanks for your vote!");
    });
  };

  const updateVotedObj = (typeOfId, currentId) => {
    setVotedObj((currentObj) => {
      const newCurrentObj = { ...currentObj };
      newCurrentObj[`${typeOfId} ${currentId}`] = true;
      return newCurrentObj;
    });
  };

  console.log(current_id, "<<currentId");
  console.log(votedObj);

  return (
    <>
      <Icon
        className="reviews__upvote"
        color="grey"
        name="chevron up"
        size="large"
        disabled={
          (current_id && votedObj.hasOwnProperty(`review_id ${current_id}`)) ||
          (current_id && votedObj.hasOwnProperty(`comment_id ${current_id}`))
        }
        onClick={() => {
          changeVotes(1, current_id);
        }}
      />
      <p className="reviews__votes">{votes} Votes</p>
      <Icon
        className="reviews__downvote"
        color="grey"
        name="chevron down"
        size="large"
        disabled={
          (current_id && votedObj.hasOwnProperty(`review_id ${current_id}`)) ||
          (current_id && votedObj.hasOwnProperty(`comment_id ${current_id}`))
        }
        onClick={() => {
          changeVotes(-1, current_id);
        }}
      />
    </>
  );
};

export default Voter;
