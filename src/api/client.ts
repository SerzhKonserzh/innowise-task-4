import type { Posts } from '../types/Post';
import type { User } from '../types/User';
import api from './api';

export const fetchPosts = async (limit: number, skip: number, sortBy: string = 'id', order: string = 'asc', tags: string[] = []) => {
	let url = `/posts?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
	
	if (tags.length > 0) {
		url += `&tags=${tags.join(',')}`;
	}
	
	const res = await api.get<Posts>(url);
	return res.data;
};

export const fetchPostsByTag = async (tag: string, limit: number, skip: number, sortBy: string = 'id', order: string = 'asc') => {
	const url = `/posts/tag/${tag}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
	const res = await api.get<Posts>(url);
	return res.data;
};

export const fetchAllTags = async () => {
	const res = await api.get<string[]>('/posts/tag-list');
	return res.data;
};

export const fetchUserById = async (userId: number) => {
	const res = await api.get<User>(`/users/${userId}`);
	return res.data;
};
