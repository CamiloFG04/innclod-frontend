import { defineStore } from 'pinia';
import { User } from 'src/auth/interfaces/user';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const status = ref<string>('authenticating');
  const user = ref<User>();
  const accessToken = ref<string>();

  return {
    // state
    status,
    user,
    accessToken,

    // getters
    currentState: computed(() => status.value),
    currentUser: computed(() => user.value),

    // actions
    setData(newUser: User, access_token: string) {
      if (access_token) {
        localStorage.setItem('access_token', access_token);
        accessToken.value = access_token;
      }

      user.value = newUser;
      status.value = 'authenticated';
    },
    logout() {
      localStorage.removeItem('access_token');
      accessToken.value = undefined;
      user.value = undefined;
      status.value = 'not-authenticated';
    },
  };
});
