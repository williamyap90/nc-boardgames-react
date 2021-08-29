import { Divider } from "semantic-ui-react";
import { useEffect } from "react";
import { getCategories } from "../Api";

const Filters = ({ categories, setCategories }) => {
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [setCategories]);

  return (
    <section className="filters__container">
      <Divider horizontal className="filters__header">
        Filters:
      </Divider>
      <label htmlFor="category">Category:</label>
      <select name="category" id="category">
        <option value="">Select a category</option>
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
      <select name="sort_by" id="sort_by">
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

      <label htmlFor="page">Results per page: 10</label>
    </section>
  );
};

export default Filters;
