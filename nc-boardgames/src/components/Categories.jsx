import { useEffect, useState } from "react";
import { getCategories } from "../Api";
import { Link, useParams } from "react-router-dom";
import { Divider } from "semantic-ui-react";

const Categories = () => {
  const { category } = useParams();
  const [categories, setCategories] = useState([]);

  //retrieved category from params when clicking category card
  //use category params to get reviews with query ?category=strategy

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <section className="section__body section__body-categories">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider" id="page__divider">
        Categories
      </Divider>
      <ul className="category__container">
        {categories.map((category) => {
          return (
            <Link to={`/categories/${category.slug}`}>
              <li className="category__item" key={category.slug}>
                <h3 className="category__item-title"> {category.slug}</h3>
                <p>{category.description}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
