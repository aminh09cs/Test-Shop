import { api } from 'src/boot/axios';

export const albumRepo = {
  getAll: () => api.get<Album[]>('/albums'),
  getAlbumPhotos: (id: number) => api.get<AlbumPhoto[]>(`/albums/${id}/photos`),
};
