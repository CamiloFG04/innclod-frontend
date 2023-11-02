import { RouteRecordRaw } from 'vue-router';
import authRouter from 'src/auth/router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    ...authRouter,
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
