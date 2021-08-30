import { Icon } from "semantic-ui-react";
import { patchCommentVotes } from "../Api";

const displayComment = (comment) => {
  const changeCommentVotes = (num, review_id) => {
    patchCommentVotes(num, review_id);
  };

  return (
    <div className="comments__container" key={comment.comment_id}>
      <p className="comments__body">{comment.body}</p>
      <p className="comments__author">{comment.author}</p>
      <p className="comments__created">{comment.created_at}</p>

      <div
        className="comments__upvote"
        onClick={() => {
          changeCommentVotes(1, comment.comment_id);
        }}
      >
        <Icon color="grey" name="caret up" size="large" />
      </div>
      <p className="comments__votes">{comment.votes} Votes</p>
      <div
        className="comments__downvote"
        onClick={() => {
          changeCommentVotes(-1, comment.comment_id);
          //comments work, but dont render changes unless button hidden. added comments to singleReview dependency
        }}
      >
        <Icon color="grey" name="caret down" size="large" />
      </div>
    </div>
  );
};

export default displayComment;
