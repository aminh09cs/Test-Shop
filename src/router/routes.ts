import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/posts' },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/posts',
    component: () => import('layouts/MainLayout.vue'),
    meta: { isAuthenticated: true },
    children: [
      {
        path: '',
        component: () => import('pages/post/PostManagement.vue'),
      },
      {
        path: '/posts/:id/comments',
        component: () => import('pages/post/PostCommentView.vue'),
      },
    ],
  },
  {
    path: '/albums',
    component: () => import('layouts/MainLayout.vue'),
    meta: { isAuthenticated: true },
    children: [
      {
        path: '',
        component: () => import('pages/album/AlbumManagement.vue'),
      },
      {
        path: '/albums/:id/photos',
        component: () => import('pages/album/AlbumPhoto.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
