import { useEffect } from "react";
import { getCategories } from "../Api";

const Filters = ({
  categories,
  setCategories,
  categoryFilter,
  setCategoryFilter,
}) => {
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [setCategories]);

  return (
    <section className="filters__container">
      <div className="filters__header">Filters:</div>
      <div className="filters__main">
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          value={categoryFilter}
          onChange={(event) => {
            setCategoryFilter(event.target.value);
          }}
        >
          <option
            value=""
            onClick={(event) => {
              setCategoryFilter("");
            }}
          >
            Select a category
          </option>
          {categories.map((category) => {
            return (
              <option
                value={category.slug}
                className="category__filter-option"
                key={category.slug}
              >
                {category.slug}
              </option>
            );
          })}
        </select>

        <label htmlFor="sort_by">Sort by:</label>
        <select
          name="sort_by"
          id="sort_by"
          onClick={(event) => {
            console.log(event.target.value);
          }}
        >
          <option value="">Select sort by</option>
          <option value="review">Review ID</option>
          <option value="title">Title</option>
          <option value="votes">Votes</option>
          <option value="created_at">Created at</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select name="order" id="order">
          <option value="">Select order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label htmlFor="limit">Results per page: </label>
        <select name="limit" id="limit">
          <option value="">#</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="filters__separator"></div>
    </section>
  );
};

export default Filters;
