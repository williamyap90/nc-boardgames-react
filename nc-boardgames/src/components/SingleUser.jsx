import { useEffect, useState } from "react";
import { getSingleUser } from "../Api";
import { useParams, Link } from "react-router-dom";

const SingleUser = () => {
  const [singleUser, setSingleUser] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    getSingleUser(username).then((data) => {
      setSingleUser(data);
    });
  }, [username]);

  return (
    <section>
      <h2>Users</h2>
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
          <Link to="/users">
            <button className="users__button">Go back</button>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default SingleUser;
