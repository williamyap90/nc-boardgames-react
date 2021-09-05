import { useEffect, useState } from "react";
import { getCategories } from "../Api";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";

const Categories = ({ categories, setCategories, setFilters }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCategories().then((data) => {
      setCategories(data);
      setIsLoading(false);
    });
  }, [setCategories]);

  if (isLoading) {
    return <div className="loading loading--full-height"></div>;
  }

  return (
    <section className="section__body section__body-categories">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider" id="page__divider">
        Categories
      </Divider>
      <ul className="category__container">
        {categories.map((category) => {
          return (
            <li
              className="category__item"
              key={category.slug}
              onClick={() => {
                setFilters((currFilters) => {
                  const newFilters = { ...currFilters };
                  newFilters.category = category.slug;
                  return newFilters;
                });
              }}
            >
              <Link to={`/reviews?category=${category.slug}`}>
                <h3 className="category__item-title"> {category.slug}</h3>
                <p>{category.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
