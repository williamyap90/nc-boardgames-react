import { useEffect, useState } from "react";
import { getReviews } from "../Api";
import { changeVotes } from "../utils/utils";
import { Link } from "react-router-dom";
import { Divider, Icon, Button, Label } from "semantic-ui-react";
import Filters from "./Filters";

const Reviews = ({ categories, setCategories, filters, setFilters }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(filters).then((data) => {
      setReviews(data);
    });
  }, [filters]);

  return (
    <section className="section__body section__body-reviews">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider" id="page__divider">
        Reviews
      </Divider>
      <div className="reviews__content-body">
        <Filters
          categories={categories}
          setCategories={setCategories}
          filters={filters}
          setFilters={setFilters}
        />

        <ul className="reviews__container">
          {reviews.map((review) => {
            return (
              <li className="reviews__item" key={review.review_id}>
                <Link
                  to={`/reviews/${review.review_id}`}
                  className="reviews__title"
                >
                  <h3 className="reviews__title">{review.title}</h3>
                </Link>
                <img
                  src={review.review_img_url}
                  alt={review.review_title}
                  className="reviews__image"
                />
                <p className="reviews__category">{review.category}</p>
                <div className="reviews__details">
                  <p className="reviews__owner">By {review.owner}</p>
                  <p className="reviews__created">{review.created_at}</p>
                </div>
                <p className="reviews__id">ID: #{review.review_id}</p>

                <Button
                  as="div"
                  labelPosition="left"
                  className="reviews__comment"
                  id="reviews__comment"
                  size="large"
                  style={{ marginRight: "1em" }}
                >
                  <Label as="a" basic>
                    {review.comment_count}
                  </Label>
                  <Button icon>
                    <Icon name="comment" />
                  </Button>
                </Button>

                <div
                  className="reviews__upvote"
                  onClick={() => {
                    changeVotes(1, review.review_id);
                  }}
                >
                  <Icon color="grey" name="caret up" size="huge" />
                </div>
                <p className="reviews__votes">{review.votes} Votes</p>
                <div
                  className="reviews__downvote"
                  onClick={() => {
                    changeVotes(-1, review.review_id);
                  }}
                >
                  <Icon color="grey" name="caret down" size="huge" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="reviews__pagination">
        Previous - Showing 1-10 of 24 - Next
      </p>
    </section>
  );
};

export default Reviews;
