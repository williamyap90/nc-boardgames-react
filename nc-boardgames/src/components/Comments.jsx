import { Icon } from "semantic-ui-react";

const displayComment = (comment) => {
  return (
    <div className="comments__container" key={comment.comment_id}>
      <p className="comments__body">{comment.body}</p>
      <p className="comments__author">{comment.author}</p>
      <p className="comments__created">{comment.created_at}</p>

      <Icon
        color="grey"
        name="caret up"
        size="large"
        className="comments__upvote"
      />
      <p className="comments__votes">{comment.votes} Votes</p>
      <Icon
        color="grey"
        name="caret down"
        size="large"
        className="comments__downvote"
      />
    </div>
  );
};

export default displayComment;
