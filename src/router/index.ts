import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { storeToRefs } from 'pinia';
import { route } from 'quasar/wrappers';
import { useAuthStore } from '../stores/auth';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);
    if (to.meta.isAuthenticated) {
      if (isAuthenticated.value) {
        if (to.path === '/login') {
          return next('/posts');
        } else return next();
      }
      return next('/login');
    } else {
      if (isAuthenticated.value) return next('/posts');
      return next();
    }
  });

  return Router;
});
