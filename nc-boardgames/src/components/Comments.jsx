import { Icon } from "semantic-ui-react";
import {
  patchCommentVotes,
  getCommentsByReviewId,
  deleteComment,
} from "../Api";
import { useEffect } from "react";
import Voter from "./Voter";

const Comments = ({
  review_id,
  comments,
  setComments,
  username,
  votedObj,
  setVotedObj,
}) => {
  useEffect(() => {
    getCommentsByReviewId(review_id).then((data) => {
      setComments(data);
    });
  }, []);

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

            <div className="comments__voter-container">
              <Voter
                current_id={comment.comment_id}
                votes={comment.votes}
                setState={setComments}
                patchFunction={patchCommentVotes}
                votedObj={votedObj}
                setVotedObj={setVotedObj}
              />
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
