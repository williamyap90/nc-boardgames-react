import { Icon } from "semantic-ui-react";
import { patchCommentVotes, getCommentsByReviewId } from "../Api";
import { useState, useEffect } from "react";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [voteChange, setVoteChange] = useState(0);

  //REDO GET COMMENTS
  console.log(review_id, "review_id");

  // const getComments = (review_id) => {
  //   getCommentsByReviewId(review_id).then((data) => {
  //     setComments(data);
  //   });
  // };

  useEffect(() => {
    getCommentsByReviewId(review_id).then((data) => {
      setComments(data);
    });
  }, []);

  const changeCommentVotes = (num, review_id) => {
    patchCommentVotes(num, review_id).then((updatedComment) => {
      console.log(updatedComment);
      //setVoteChange
    });
  };

  return (
    <section>
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
    </section>
  );
};

export default Comments;
