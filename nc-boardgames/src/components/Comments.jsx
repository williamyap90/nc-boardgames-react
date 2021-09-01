import { Icon } from "semantic-ui-react";
import { patchCommentVotes, getCommentsByReviewId } from "../Api";
import { useEffect } from "react";

const Comments = ({ review_id, comments, setComments }) => {
  useEffect(() => {
    getCommentsByReviewId(review_id).then((data) => {
      setComments(data);
    });
  }, []);

  const changeCommentVotes = (num, comment_id) => {
    setComments((currentComments) => {
      const newComments = currentComments.map((comment) => {
        return (comment = { ...comment });
      });
      newComments.forEach((comment) => {
        if (comment.comment_id === comment_id) {
          comment.votes = comment.votes + num;
        }
      });
      return newComments;
    });
    patchCommentVotes(num, comment_id).then(() => {
      alert("Thanks for your vote!");
    });
  };

  return (
    <>
      {comments.map((comment) => {
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
              }}
            >
              <Icon color="grey" name="caret down" size="large" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
