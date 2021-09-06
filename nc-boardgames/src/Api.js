import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-boardgames.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data.result;
};

export const getReviews = async (filters, page) => {
  const params = {
    params: {
      category: filters.category,
      sort_by: filters.sort_by,
      order: filters.order,
      page: page,
      limit: filters.limit,
    },
  };

  const { data } = await api.get("/reviews", params);
  return data.result;
};

export const getSingleReview = async (review_id) => {
  const { data } = await api.get(`/reviews/${review_id}`);
  return data.review[0];
};

export const getCommentsByReviewId = async (review_id) => {
  const { data } = await api.get(`reviews/${review_id}/comments`);
  return data.comments;
};

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data.users;
};

export const getSingleUser = async (username) => {
  const { data } = await api.get(`/users/${username}`);
  return data.user[0];
};

export const patchVotes = async (vote, id) => {
  try {
    const res = await api.patch(`/reviews/${id}`, {
      inc_votes: vote,
    });
    return res.data.review;
  } catch (err) {
    console.log(err);
  }
};

export const patchCommentVotes = async (vote, id) => {
  try {
    const res = await api.patch(`/comments/${id}`, {
      inc_votes: vote,
    });
    return res.data.comment;
  } catch (err) {
    console.log(err);
  }
};

export const postNewComment = async (commentBody, user, id) => {
  const newComment = { username: user, body: commentBody };
  try {
    const res = await api.post(`/reviews/${id}/comments`, newComment);
    return res.data.comment;
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (comment_id) => {
  try {
    const res = await api.delete(`/comments/${comment_id}`);
    return res.status;
  } catch (err) {
    console.log(err);
  }
};

export const patchComment = async (commentBody, id) => {
  const patchItem = { body: commentBody };
  try {
    const res = await api.patch(`/comments/${id}`, patchItem);
    return res.data.comment[0];
  } catch (err) {
    console.log(err);
  }
};

export const patchReview = async (reviewBody, id) => {
  const patchItem = { review_body: reviewBody };
  try {
    const res = await api.patch(`/reviews/${id}`, patchItem);
    return res.data.review[0];
  } catch (err) {
    console.log(err);
  }
};
