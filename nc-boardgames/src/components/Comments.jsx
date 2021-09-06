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
  // const [commentsFilterObj, setCommentsFilterObj] = useState({});
  const [editComment, setEditComment] = useState({
    isEditing: false,
    idToEdit: null,
  });

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

  // const updateCommentsFilterObj = (event, labelName) => {
  //   setCommentsFilterObj((currObj) => {
  //     const newObj = { ...currObj };
  //     newObj[labelName] = event.target.value;
  //     console.log(newObj);
  //     return newObj;
  //   });
  // };

  return (
    <>
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
              <div className="comments__editdel-container">
                <span
                  className="comments__edit"
                  onClick={() => {
                    console.log("edit");
                  }}
                >
                  <Icon color="grey" name="edit" size="large" />
                </span>
                <span
                  className="comments__delete"
                  onClick={() => {
                    removeComment(comment.comment_id);
                  }}
                >
                  <Icon color="grey" name="trash alternate" size="large" />
                </span>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default Comments;
