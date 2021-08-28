import { useEffect, useState } from "react";
import { getSingleReview, getCommentsByReviewId } from "../Api";
import { useParams, Link } from "react-router-dom";
import { Button, Icon, Divider } from "semantic-ui-react";
import displayComment from "./Comments";

const SingleReview = () => {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    getSingleReview(review_id).then((data) => {
      setSingleReview(data);
    });
  }, [review_id, showComments]);

  const getComments = (review_id) => {
    getCommentsByReviewId(review_id).then((data) => {
      setComments(data);
    });
    //create a button in review, onClick execute getComments & show comments
    //set button true or false to show or hide comments, conditional to display?
  };

  return (
    <section className="section__body section__body-review">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider">
        Review
      </Divider>
      <ul className="single_review__container">
        <li className="single_review__item" key={singleReview.review_id}>
          <h3 className="single_review__item-title">{singleReview.title}</h3>
          <img
            className="single_review__image"
            src={singleReview.review_img_url}
            alt={singleReview.review_title}
          />
          <p>Designer: {singleReview.designer}</p>
          <p>Owner: {singleReview.owner}</p>
          <p>Category: {singleReview.category}</p>
          <p>Review: {singleReview.review_body}</p>
          <p>Created at: {singleReview.created_at}</p>
          <p>Comment count: {singleReview.comment_count}</p>
          <p>Review ID: {singleReview.review_id}</p>
          <p>Votes: {singleReview.votes}</p>
          <Button
            animated
            className="reviews__button"
            onClick={() => {
              getComments(singleReview.review_id);
              showComments === true
                ? setShowComments(false)
                : setShowComments(true);
            }}
          >
            <Button.Content visible>View comments</Button.Content>
            <Button.Content hidden>
              <Icon name="chevron down" />
            </Button.Content>
          </Button>
          <Link to="/reviews">
            <Button animated className="reviews__button">
              <Button.Content visible>Go back</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>
          </Link>
          {showComments &&
            comments.map((comment) => {
              return displayComment(comment);
            })}
        </li>
      </ul>
    </section>
  );
};

export default SingleReview;
