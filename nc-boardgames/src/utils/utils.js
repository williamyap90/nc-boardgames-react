import { patchVotes } from "../Api";

export const changeVotes = (num, review_id) => {
  patchVotes(num, review_id);
};
