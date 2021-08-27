import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-boardgames.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data.result;
};

export const getReviews = async () => {
  const { data } = await api.get("/reviews");
  return data.result.reviews;
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
