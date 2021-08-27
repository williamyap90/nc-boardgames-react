import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-boardgames.herokuapp.com/api",
});

export const getReviews = async () => {
  const { data } = await api.get("/reviews");
  return data.result.reviews;
};