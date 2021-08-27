import { useEffect, useState } from "react";
import { getReviews } from "../Api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
    });
  }, []);

  return (
    <section>
      <h2>Reviews</h2>
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
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;
