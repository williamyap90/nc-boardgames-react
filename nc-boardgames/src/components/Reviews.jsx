import { useEffect, useState } from "react";
import { getReviews } from "../Api";
import { Link } from "react-router-dom";
import { Button, Icon, Divider } from "semantic-ui-react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
    });
  }, []);

  return (
    <section>
      <Divider horizontal class="page__divider">
        Reviews
      </Divider>
      <ul className="reviews__container">
        {reviews.map((review) => {
          return (
            <li className="reviews__item" key={review.review_id}>
              <h3 className="reviews__item-title">{review.title}</h3>
              <img
                className="reviews__image"
                src={review.review_img_url}
                alt={review.review_title}
              />
              <p>User: {review.owner}</p>
              <p>Category: {review.category}</p>
              <p>Created at: {review.created_at}</p>
              <p>Comment count: {review.comment_count}</p>
              <p>Review ID: {review.review_id}</p>
              <p>Votes: {review.votes}</p>
              <Link to={`/reviews/${review.review_id}`}>
                <Button animated className="reviews__button">
                  <Button.Content visible>View more</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
      <p> Previous - Showing 1-10 of 24 - Next</p>
    </section>
  );
};

export default Reviews;
