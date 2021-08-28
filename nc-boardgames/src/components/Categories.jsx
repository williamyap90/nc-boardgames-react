import { useEffect, useState } from "react";
import { getCategories } from "../Api";
import { Divider } from "semantic-ui-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <section>
      <Divider horizontal class="page__divider">
        Categories
      </Divider>
      <ul className="category__container">
        {categories.map((category) => {
          return (
            <li className="category__item" key={category.slug}>
              <h3 className="category__item-title"> {category.slug}</h3>
              <p>{category.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
