import { useEffect, useState } from "react";
import { getUsers } from "../Api";

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
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Users;
