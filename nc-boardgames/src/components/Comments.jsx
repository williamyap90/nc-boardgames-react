import { Icon } from "semantic-ui-react";
import {
  patchCommentVotes,
  getCommentsByReviewId,
  deleteComment,
} from "../Api";
import { useEffect } from "react";

const Comments = ({ review_id, comments, setComments, username }) => {
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

  const removeComment = (comment_id) => {
    setComments((currentComments) => {
      let newComments = currentComments.map((comment) => {
        return (comment = { ...comment });
      });
      newComments = newComments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
      return newComments;
    });
    deleteComment(comment_id).then(() => {
      alert("Your comment has been deleted!");
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

            {comment.author === username ? (
              <span
                className="comments__delete"
                onClick={() => {
                  removeComment(comment.comment_id);
                }}
              >
                <Icon color="grey" name="trash alternate" size="large" />
              </span>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Comments;
