import { useAuthStore } from 'src/stores/useAuth';

import { innClodApi } from '../../api/innClodApi';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();

  const login = async (
    email: string,
    password: string
  ): Promise<Response | Error> => {
    try {
      const { data } = await innClodApi.post<Response>('/auth/login', {
        email,
        password,
      });

      if (data.access_token) {
        const response = await innClodApi.post<User>(
          '/auth/me',
          {},
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          }
        );
        store.setData(response.data, data.access_token);
      }

      return data;
    } catch (error) {
      return error as AxiosError;
    }
  };

  const onSubmit = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      if (response instanceof AxiosError) {
        Swal.fire('Error', response.response?.data.error, 'error');
      } else {
        router.push({ name: 'documents' });
      }
    } catch (error) {
      Swal.fire('Error', 'Error inesperado', 'error');
    }
  };

  const checkAuthentication = async () => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      store.logout();
      return { success: false, message: 'No estas autorizado' };
    }
    const { data } = await innClodApi.post<User>(
      '/auth/me',
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    store.setData(data, access_token);
    return { success: true, message: 'Usuario autenticado' };
  };

  return {
    // methods
    onSubmit,
    checkAuthentication,
  };
};

export default useAuth;
