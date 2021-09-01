import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const NotFound = () => {
  return (
    <div className="error_page">
      <h1>404 - Not Found!</h1>
      <p>The page you were looking for does not exist!</p>
      <Link to="/">
        <Button animated="vertical">
          <Button.Content hidden>
            <Icon name="home" style={{ width: 100 }} />
          </Button.Content>
          <Button.Content visible>Go Home</Button.Content>
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
