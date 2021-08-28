import { useEffect, useState } from "react";
import { getUsers } from "../Api";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <section>
      <h2>Users</h2>
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
