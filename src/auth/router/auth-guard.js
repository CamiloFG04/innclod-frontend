import useAuth from '../composables/useAuth';

const isAuthenticatedGuard = async (to, from, next) => {
  const { checkAuthentication } = useAuth();
  const { success } = await checkAuthentication();

  if (success) next();
  else next({ name: 'login' });
};

export default isAuthenticatedGuard;
