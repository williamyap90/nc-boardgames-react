import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav";
import Categories from "./components/Categories";
import Reviews from "./components/Reviews";
import Users from "./components/Users";
import SingleReview from "./components/SingleReview";
import SingleUser from "./components/SingleUser";
import NotFound from "./components/NotFound";

function App() {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: null,
    sort_by: null,
    order: null,
    p: 1,
    limit: 10,
  });
  const [user, setUser] = useState({
    username: "cooljmessy",
  });

  const [votedObj, setVotedObj] = useState({});

  return (
    <BrowserRouter>
      <section className="App">
        <Nav setFilters={setFilters} user={user} setUser={setUser} />
        <Switch>
          <Route exact path={["/", "/reviews"]}>
            <Reviews
              categories={categories}
              setCategories={setCategories}
              filters={filters}
              setFilters={setFilters}
              reviews={reviews}
              setReviews={setReviews}
              votedObj={votedObj}
              setVotedObj={setVotedObj}
            />
          </Route>
          <Route exact path="/reviews/:review_id">
            <SingleReview
              user={user}
              reviews={reviews}
              setReviews={setReviews}
              votedObj={votedObj}
              setVotedObj={setVotedObj}
            />
          </Route>
          <Route exact path="/categories">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFilters={setFilters}
            />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:username">
            <SingleUser user={user} setUser={setUser} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
