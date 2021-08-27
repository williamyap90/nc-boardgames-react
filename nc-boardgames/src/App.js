import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Reviews from "./components/Reviews";
import Users from "./components/Users";
import SingleReview from "./components/SingleReview";

function App() {
  return (
    <BrowserRouter>
      <section className="App">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/reviews">
            <Reviews />
          </Route>
          <Route exact path="/reviews/:review_id">
            <SingleReview />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
