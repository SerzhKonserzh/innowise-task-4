import type { Posts } from "../types/Post";
import api from "./api";

export const fetchPosts = async () => {
  const res = await api.get<Posts>('/posts');
  return res.data;
};
