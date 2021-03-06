import { useEffect, useState } from "react";
import { getUsers } from "../Api";
import { Link } from "react-router-dom";
import { Button, Icon, Divider } from "semantic-ui-react";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="loading loading--full-height"></div>;
  }

  return (
    <section className="section__body section__body-users">
      <div className="page__divider_div"></div>
      <Divider horizontal className="page__divider" id="page__divider">
        Users
      </Divider>
      <ul className="users__container">
        {users.map((user) => {
          return (
            <li className="user__item" key={user.username}>
              <h3 className="user__item-title"> {user.username}</h3>
              <img
                className="user__image"
                src={user.avatar_url}
                alt={user.username}
              />
              <p>Username: {user.username}</p>
              <p>Name: {user.name}</p>
              <Link to={`/users/${user.username}`}>
                <Button animated className="users__button">
                  <Button.Content visible>View profile</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Users;
