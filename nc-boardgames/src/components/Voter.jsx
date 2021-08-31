import { Icon } from "semantic-ui-react";
import { patchVotes } from "../Api";

const Voter = ({ review_id, votes }) => {
  const changeVotes = (num, id) => {
    patchVotes(num, id);
  };

  return (
    <section>
      <div
        className="reviews__upvote"
        onClick={() => {
          changeVotes(1, review_id);
        }}
      >
        <Icon color="grey" name="caret up" size="huge" />
      </div>
      <p className="reviews__votes">{votes} Votes</p>
      <div
        className="reviews__downvote"
        onClick={() => {
          changeVotes(-1, review_id);
        }}
      >
        <Icon color="grey" name="caret down" size="huge" />
      </div>
    </section>
  );
};

export default Voter;
