import { useEffect, useState } from "react";
import { getSingleReview, postNewComment } from "../Api";
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

const SingleReview = ({ user, isLoading, setIsLoading }) => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [comments, setComments] = useState([]);
  const { username } = user;

  useEffect(() => {
    getSingleReview(review_id).then((data) => {
      setSingleReview(data);
    });
  }, [review_id, comments]);

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
      }
    });
    setNewCommentBody("");
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
          <img
            className="single_review__image"
            src={singleReview.review_img_url}
            alt={singleReview.review_title}
          />
          <p className="single_review__designer">
            Designer: {singleReview.designer}
          </p>
          <p className="single_review__category">{singleReview.category}</p>
          <p className="single_review__body">{singleReview.review_body}</p>
          <p className="single_review__id">ID: #{singleReview.review_id}</p>
          <div className="single_review__authordate">
            <p className="single_review__author">By {singleReview.owner}</p>
            <p className="single_review__created">{singleReview.created_at}</p>
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
              primary
              style={{ minHeight: 100 }}
              disabled={newCommentBody.length === 0 ? true : false}
            >
              Post comment
            </Button>
          </Form>

          <Voter
            review_id={singleReview.review_id}
            votes={singleReview.votes}
            setReviewState={setSingleReview}
          />

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
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleReview;
