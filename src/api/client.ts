import type { Posts } from '../types/Post';
import type { User } from '../types/User';
import api from './api';

export const fetchPosts = async (limit: number, skip: number) => {
	const res = await api.get<Posts>(`/posts?limit=${limit}&skip=${skip}`);
	return res.data;
};

export const fetchUserById = async (userId: number) => {
	const res = await api.get<User>(`/users/${userId}`);
	return res.data;
};
