import { useEffect, useState } from "react";
import { getSingleReview } from "../Api";
import { useParams, Link } from "react-router-dom";

const SingleReview = () => {
  const [singleReview, setSingleReview] = useState({});
  const { review_id } = useParams();

  useEffect(() => {
    getSingleReview(review_id).then((data) => {
      setSingleReview(data);
    });
  }, [review_id]);

  return (
    <section>
      <h2>Review</h2>
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
          <Link to="/reviews">
            <button className="reviews__button">Go back</button>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default SingleReview;
