

export default {
  name: 'auth',
  component: () => import(/* webpackChunkName: "auth" */ 'src/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ 'src/auth/pages/LoginPage.vue')
    },
  ]
}
