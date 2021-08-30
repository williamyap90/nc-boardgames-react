import { useEffect, useState } from "react";
import { getSingleReview, getCommentsByReviewId } from "../Api";
import { useParams, Link } from "react-router-dom";
import { Button, Icon, Divider, Label } from "semantic-ui-react";
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
  };

  return (
    <section className="section__body section__body-review">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider" id="page__divider">
        Review
      </Divider>
      <div className="single_review__container" key={singleReview.review_id}>
        <div className="single_review__item">
          <h3 className="single_review__item-title">{singleReview.title}</h3>
          <p className="single_review__author">By {singleReview.owner}</p>
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
          <p className="single_review__created">{singleReview.created_at}</p>
          <p className="single_review__id">ID: #{singleReview.review_id}</p>

          <Button
            as="div"
            labelPosition="left"
            className="single_review__comment"
            id="single_review__comment"
            size="large"
            style={{ marginRight: "1em" }}
          >
            <Label as="a" basic>
              {singleReview.comment_count}
            </Label>
            <Button icon>
              <Icon name="comment" />
            </Button>
          </Button>

          <Icon
            color="grey"
            name="caret up"
            size="huge"
            className="single_review__upvote"
          />
          <p className="single_review__votes">{singleReview.votes} Votes</p>
          <Icon
            color="grey"
            name="caret down"
            size="huge"
            className="single_review__downvote"
          />

          <Button
            animated
            className="reviews__btn-view"
            onClick={() => {
              getComments(singleReview.review_id);
              showComments === true
                ? setShowComments(false)
                : setShowComments(true);
            }}
          >
            <Button.Content visible className="reviews__view">
              View comments
            </Button.Content>
            <Button.Content hidden>
              <Icon name="chevron down" />
            </Button.Content>
          </Button>

          <Button animated className="reviews__btn-back">
            <Link to="/reviews">
              <Button.Content visible>Go back</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Link>
          </Button>
          <div className="reviews__comments-container">
            {showComments &&
              comments.map((comment) => {
                return displayComment(comment);
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleReview;
