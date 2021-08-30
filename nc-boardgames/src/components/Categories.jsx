import { useEffect } from "react";
import { getCategories } from "../Api";
import { Link } from "react-router-dom";
import { Divider } from "semantic-ui-react";

const Categories = ({ categories, setCategories, setCategoryFilter }) => {
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [setCategories]);

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
                setCategoryFilter(category.slug);
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
