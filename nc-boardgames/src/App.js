import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Reviews from "./components/Reviews";
import Users from "./components/Users";
import SingleReview from "./components/SingleReview";
import SingleUser from "./components/SingleUser";

function App() {
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");

  return (
    <BrowserRouter>
      <section className="App">
        <Nav setCategoryFilter={setCategoryFilter} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/reviews">
            <Reviews
              categories={categories}
              setCategories={setCategories}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
          </Route>
          <Route exact path="/reviews/:review_id">
            <SingleReview />
          </Route>
          <Route exact path="/categories">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setCategoryFilter={setCategoryFilter}
            />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:username">
            <SingleUser />
          </Route>
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
