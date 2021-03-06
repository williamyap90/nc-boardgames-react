import { useEffect, useState } from "react";
import {
  getSingleReview,
  postNewComment,
  patchVotes,
  patchReview,
} from "../Api";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Icon,
  Divider,
  Label,
  Form,
  TextArea,
} from "semantic-ui-react";
import Comments from "./Comments";
import Voter from "./Voter";
import NotFound from "./NotFound";
import { fixDate } from "../utils/utils";

const SingleReview = ({ user, votedObj, setVotedObj }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [comments, setComments] = useState([]);
  const { username } = user;
  const [hasErrored, setHasErrored] = useState(false);
  const [editingReview, setEditingReview] = useState({
    isEditing: false,
    idToEdit: null,
  });
  const [newEditReviewBody, setNewEditReviewBody] = useState("");

  useEffect(() => {
    setIsLoading(false);
    getSingleReview(review_id)
      .then((data) => {
        setSingleReview(data);
      })
      .catch((err) => {
        setHasErrored(true);
      });
  }, [review_id, comments]);

  if (hasErrored) return <NotFound />;

  const updateCommentList = (newCommentBody, username, review_id) => {
    postNewComment(newCommentBody, username, review_id).then((res) => {
      if (res) {
        alert("Successfully posted a new comment!");
        setComments((currentComments) => {
          const newComments = currentComments.map((comment) => {
            return (comment = { ...comment });
          });
          newComments.unshift(res[0]);
          return newComments;
        });
      } else {
        alert(
          "Sorry, you can't leave a comment as a guest - please login first."
        );
      }
    });
    setNewCommentBody("");
  };

  const editReview = (review_id) => {
    setEditingReview((currEditingReview) => {
      const newEditingReview = { ...currEditingReview };
      newEditingReview.idToEdit = review_id;
      newEditingReview.isEditing = true;
      return newEditingReview;
    });
  };
  const confirmEditReview = (review_id) => {
    patchReview(newEditReviewBody, review_id).then((data) => {
      setEditingReview((currEditingReview) => {
        const newEditingReview = { ...currEditingReview };
        newEditingReview.idToEdit = null;
        newEditingReview.isEditing = false;
        return newEditingReview;
      });
      setComments((currentReview) => {
        const newReview = currentReview.map((review) => {
          return (review = { ...review });
        });
        newReview.forEach((review) => {
          if (review.review_id === review_id) {
            review.body = data.body;
          }
        });
        return newReview;
      });
      alert("Successfully edited your review.");
    });
  };

  const cancelEditReview = (review_id) => {
    setEditingReview((currEditingReview) => {
      const newEditingReview = { ...currEditingReview };
      newEditingReview.idToEdit = review_id;
      newEditingReview.isEditing = false;
      return newEditingReview;
    });
  };

  if (isLoading) {
    return <div className="loading loading--full-height"></div>;
  }

  return (
    <section className="section__body section__body-review">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider" id="page__divider">
        Review
      </Divider>
      <div className="single_review__container" key={singleReview.review_id}>
        <div className="single_review__item">
          <h3 className="single_review__item-title">{singleReview.title}</h3>
          <div className="single_review__authordate">
            <p className="single_review__author">By {singleReview.owner}</p>
            <p className="single_review__created">
              {fixDate(singleReview.created_at)}
            </p>
          </div>
          <img
            className="single_review__image"
            src={singleReview.review_img_url}
            alt={singleReview.review_title}
          />
          <p className="single_review__designer">
            Designer: {singleReview.designer}
          </p>
          <p className="single_review__category">{singleReview.category}</p>
          <p className="single_review__id">ID: #{singleReview.review_id}</p>

          {editingReview.isEditing &&
          editingReview.idToEdit === singleReview.review_id ? (
            <Form
              className="single_review-textarea"
              onSubmit={(event) => {
                event.preventDefault();
                editReview(singleReview.review_id);
              }}
            >
              <TextArea
                value={newEditReviewBody || singleReview.review_body}
                onChange={(event) => {
                  setNewEditReviewBody(event.target.value);
                }}
              />
              <div className="single_review-btn-container">
                <Button
                  icon="check"
                  compact={true}
                  color="green"
                  onClick={() => {
                    confirmEditReview(singleReview.review_id);
                  }}
                />

                <Button
                  icon="close"
                  compact={true}
                  color="red"
                  onClick={() => {
                    cancelEditReview(singleReview.review_id);
                  }}
                />
              </div>
            </Form>
          ) : (
            <p className="single_review__body">{singleReview.review_body}</p>
          )}

          {singleReview.owner === username ? (
            <div className="single_review__editdel-container">
              <span
                className="single_review__edit"
                onClick={() => {
                  editReview(singleReview.review_id);
                }}
              >
                <Icon color="grey" name="edit" size="large" />
              </span>
              <span
                className="single_review__delete"
                onClick={() => {
                  // removeReview(comment.comment_id);
                }}
              >
                <Icon color="grey" name="trash alternate" size="large" />
              </span>
            </div>
          ) : null}

          <div className="single_review__voter-container">
            <Voter
              current_id={singleReview.review_id}
              votes={singleReview.votes}
              setState={setSingleReview}
              patchFunction={patchVotes}
              votedObj={votedObj}
              setVotedObj={setVotedObj}
            />
          </div>

          <Form
            className="single_review__textarea"
            onSubmit={(event) => {
              event.preventDefault();
              updateCommentList(newCommentBody, username, review_id);
              setNewCommentBody("");
            }}
          >
            <TextArea
              placeholder="Leave a comment here"
              style={{ minHeight: 100 }}
              value={newCommentBody}
              onChange={(event) => {
                setNewCommentBody(event.target.value);
              }}
            />
            <Button
              id="single_review__comment-btn"
              primary
              disabled={newCommentBody.length === 0 ? true : false}
            >
              Post comment
            </Button>
          </Form>

          <div className="single_review__btn-container">
            <Button animated className="reviews__btn-back">
              <Link to="/reviews">
                <Button.Content visible>Go back</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Link>
            </Button>
            <Button
              animated
              className="reviews__btn-view"
              onClick={() => {
                setShowComments((currVal) => !currVal);
              }}
            >
              <Button.Content visible className="reviews__view">
                View comments
              </Button.Content>
              <Button.Content hidden>
                <Icon name="chevron down" />
              </Button.Content>
            </Button>
            <Button
              as="div"
              labelPosition="left"
              className="single_review__comment"
              id="single_review__comment"
              size="large"
            >
              <Label as="a" basic>
                {singleReview.comment_count}
              </Label>
              <Button icon>
                <Icon name="comment" />
              </Button>
            </Button>
          </div>

          <div className="reviews__comments-container">
            {showComments ? (
              <Comments
                review_id={singleReview.review_id}
                comments={comments}
                setComments={setComments}
                username={username}
                votedObj={votedObj}
                setVotedObj={setVotedObj}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleReview;
