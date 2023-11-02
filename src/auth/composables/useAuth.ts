import { useAuthStore } from 'src/stores/useAuth';

import { innClodApi } from '../../api/innClodApi';

const useAuth = () => {
  // const store = useAuthStore();

  return {
    // methods
    login: async (email: string, password: string) => {
      const { data } = await innClodApi.post('/auth/login', {
        email,
        password,
      });
      console.log(data);
      return data;
    },
  };
};

export default useAuth;
