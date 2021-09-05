import { useEffect, useState } from "react";
import { getReviews, patchVotes } from "../Api";
import { Link } from "react-router-dom";
import { Divider, Icon, Button, Label } from "semantic-ui-react";
import Filters from "./Filters";
import Voter from "./Voter";
import Pagination from "./Pagination";

const Reviews = ({
  categories,
  setCategories,
  filters,
  setFilters,
  reviews,
  setReviews,
  isLoading,
  setIsLoading,
  votedObj,
  setVotedObj,
}) => {
  const [page, setPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const reviewsPerPage = 10;
  const pageCount = Math.ceil(totalReviews / reviewsPerPage);

  useEffect(() => {
    setIsLoading(true);
    getReviews(filters, page).then(({ reviews, total_count }) => {
      setReviews(reviews);
      window.scrollTo(0, 0);
      setTotalReviews(+total_count);
      setIsLoading(false);
    });
  }, [filters, page]);

  const convertTime = (time) => {
    let date = new Date(time);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };

  if (isLoading) {
    return <div className="loading loading--full-height"></div>;
  }

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
                  <p className="reviews__created">
                    {convertTime(review.created_at)}
                  </p>
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

                <div className="reviews__voter-container">
                  <Voter
                    current_id={review.review_id}
                    votes={review.votes}
                    setState={setReviews}
                    patchFunction={patchVotes}
                    votedObj={votedObj}
                    setVotedObj={setVotedObj}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Pagination page={page} setPage={setPage} pageCount={pageCount} />
    </section>
  );
};

export default Reviews;
