import { Icon } from "semantic-ui-react";
import {
  patchCommentVotes,
  getCommentsByReviewId,
  deleteComment,
} from "../Api";
import { useEffect, useState } from "react";
import Voter from "./Voter";
import { fixDate } from "../utils/utils";

const Comments = ({
  review_id,
  comments,
  setComments,
  username,
  votedObj,
  setVotedObj,
}) => {
  const [commentsFilterObj, setCommentsFilterObj] = useState({});

  useEffect(() => {
    getCommentsByReviewId(review_id).then((data) => {
      setComments(data);
    });
  }, [review_id, setComments]);

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

  const updateCommentsFilterObj = (event, labelName) => {
    setCommentsFilterObj((currObj) => {
      const newObj = { ...currObj };
      newObj[labelName] = event.target.value;
      console.log(newObj);
      return newObj;
    });
  };

  return (
    <>
      <div className="comments__sort-container">
        <label htmlFor="comments__sort_by">Sort by:</label>
        <select
          name="comments__sort_by"
          id="comments__sort_by"
          value={commentsFilterObj.sort_by || ""}
          onChange={(event) => {
            updateCommentsFilterObj(event, "sort_by");
          }}
        >
          <option value="">Select sort by</option>
          <option value="date_created">Date created</option>
          <option value="votes">Votes</option>
        </select>
        <label htmlFor="comments__order">Order: </label>
        <select
          name="comments__order"
          id="comments__order"
          value={commentsFilterObj.order || ""}
          onChange={(event) => {
            updateCommentsFilterObj(event, "order");
          }}
        >
          <option value="">Select order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {comments.map((comment) => {
        return (
          <div className="comments__container" key={comment.comment_id}>
            <p className="comments__body">{comment.body}</p>
            <p className="comments__author">{comment.author}</p>
            <p className="comments__created">{fixDate(comment.created_at)}</p>

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
