import { useEffect, useState } from "react";
import { getSingleUser } from "../Api";
import { useParams, Link } from "react-router-dom";
import { Button, Icon, Divider } from "semantic-ui-react";

const SingleUser = ({ isLoading, setIsLoading }) => {
  const [singleUser, setSingleUser] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSingleUser(username).then((data) => {
      setSingleUser(data);
      setIsLoading(false);
    });
  }, [username]);

  if (isLoading) {
    return <div className="loading loading--full-height"></div>;
  }

  return (
    <section className="section__body section__body-user">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider" id="page__divider">
        User
      </Divider>
      <ul className="users__container">
        <li className="user__item" key={singleUser.username}>
          <h3 className="user__item-title"> {singleUser.username}</h3>
          <img
            className="user__image"
            src={singleUser.avatar_url}
            alt={singleUser.username}
          />
          <p>Username: {singleUser.username}</p>
          <p>Name: {singleUser.name}</p>
          <div className="users__btn-container">
            <Link to="/users">
              <Button animated className="users__button" style={{ margin: 10 }}>
                <Button.Content visible>Go back</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
            </Link>
            <Button className="users__button" style={{ margin: 10 }}>
              Log In
            </Button>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default SingleUser;
