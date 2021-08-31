import { Button } from "semantic-ui-react";

const UserProfile = ({ user, setUser }) => {
  return (
    <div>
      {user.username ? (
        <h3>
          Welcome back, {user.username}!
          <Button
            className="userprofile_btn"
            style={{ margin: "1em" }}
            onClick={() => {
              setUser((currUser) => {
                const newUser = { ...currUser };
                newUser.username = null;
                return newUser;
              });
            }}
          >
            Logout
          </Button>
        </h3>
      ) : (
        <h3>
          Welcome Guest!
          <Button
            className="userprofile_btn"
            style={{ margin: "1em" }}
            onClick={() => {
              setUser((currUser) => {
                const newUser = { ...currUser };
                newUser.username = "cooljmessy";
                return newUser;
              });
            }}
          >
            Login
          </Button>
        </h3>
      )}
    </div>
  );
};

export default UserProfile;
