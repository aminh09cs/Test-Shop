import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
interface authInfo {
  token: string | null;
}
export const useAuthStore = defineStore('auth', {
  state: (): authInfo => ({
    token: LocalStorage.getItem('token_ne') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string | null) {
      this.token = token;
      LocalStorage.set('token_ne', token);
    },
  },
});
