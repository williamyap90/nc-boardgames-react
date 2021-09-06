import { Icon, TextArea, Form, Button } from "semantic-ui-react";
import {
  patchCommentVotes,
  getCommentsByReviewId,
  deleteComment,
  patchComment,
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
  const [editingComment, setEditingComment] = useState({
    isEditing: false,
    idToEdit: null,
  });
  const [newEditCommentBody, setNewEditCommentBody] = useState("");

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

  const editComment = (comment_id) => {
    setEditingComment((currEditingComment) => {
      const newEditingComment = { ...currEditingComment };
      newEditingComment.idToEdit = comment_id;
      newEditingComment.isEditing = true;
      return newEditingComment;
    });
  };

  const confirmEditComment = (comment_id) => {
    patchComment(newEditCommentBody, comment_id).then((data) => {
      setEditingComment((currEditingComment) => {
        const newEditingComment = { ...currEditingComment };
        newEditingComment.idToEdit = null;
        newEditingComment.isEditing = false;
        return newEditingComment;
      });
      setComments((currentComments) => {
        const newComments = currentComments.map((comment) => {
          return (comment = { ...comment });
        });
        newComments.forEach((comment) => {
          if (comment.comment_id === comment_id) {
            comment.body = data.body;
          }
        });
        return newComments;
      });
      alert("Successfully edited your comment.");
    });
  };

  const cancelEditComment = (comment_id) => {
    setEditingComment((currEditingComment) => {
      const newEditingComment = { ...currEditingComment };
      newEditingComment.idToEdit = comment_id;
      newEditingComment.isEditing = false;
      return newEditingComment;
    });
  };

  return (
    <>
      {comments.map((comment) => {
        return (
          <div className="comments__container" key={comment.comment_id}>
            {editingComment.isEditing &&
            editingComment.idToEdit === comment.comment_id ? (
              <Form
                className="comments__edit-textarea"
                onSubmit={(event) => {
                  event.preventDefault();
                  editComment(comment.comment_id);
                }}
              >
                <TextArea
                  value={newEditCommentBody || comment.body}
                  onChange={(event) => {
                    setNewEditCommentBody(event.target.value);
                  }}
                />
                <div className="comments__edit-btn-container">
                  <Button
                    icon="check"
                    compact={true}
                    color="green"
                    onClick={() => {
                      confirmEditComment(comment.comment_id);
                    }}
                  />

                  <Button
                    icon="close"
                    compact={true}
                    color="red"
                    onClick={() => {
                      cancelEditComment(comment.comment_id);
                    }}
                  />
                </div>
              </Form>
            ) : (
              <p className="comments__body">{comment.body}</p>
            )}

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
                    editComment(comment.comment_id);
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
