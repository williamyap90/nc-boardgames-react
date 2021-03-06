import { useEffect } from "react";
import { getCategories } from "../Api";

const Filters = ({ categories, setCategories, filters, setFilters }) => {
  const defaultFilters = {
    category: null,
    sort_by: null,
    order: null,
    page: 1,
    limit: 10,
  };

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [setCategories]);

  const updateFiltersObj = (event, labelName) => {
    setFilters((currFilters) => {
      const newFilters = { ...currFilters };
      newFilters[labelName] = event.target.value;
      return newFilters;
    });
  };

  return (
    <section className="filters__container">
      <div className="filters__header">Filters:</div>
      <div className="filters__main">
        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          value={filters.category || ""}
          onChange={(event) => {
            updateFiltersObj(event, "category");
          }}
        >
          <option
            value=""
            onClick={(event) => {
              setFilters(defaultFilters);
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
          value={filters.sort_by || ""}
          onChange={(event) => {
            updateFiltersObj(event, "sort_by");
          }}
        >
          <option value="">Select sort by</option>
          <option value="review_id">Review ID</option>
          <option value="title">Title</option>
          <option value="votes">Votes</option>
          <option value="created_at">Created at</option>
        </select>

        <label htmlFor="order">Order:</label>
        <select
          name="order"
          id="order"
          value={filters.order || ""}
          onChange={(event) => {
            updateFiltersObj(event, "order");
          }}
        >
          <option value="">Select order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label htmlFor="limit">Results per page: </label>
        <select
          name="limit"
          id="limit"
          value={filters.limit || 10}
          onChange={(event) => {
            updateFiltersObj(event, "limit");
          }}
        >
          <option value="10">#</option>
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
