import { api } from 'src/boot/axios';

export const postRepo = {
  getAll: () => api.get<Post[]>('/posts'),
  getCommentPost: (id: number) =>
    api.get<PostComment[]>(`/comments?postId=${id}`),
};
