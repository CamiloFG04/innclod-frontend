import { RouteRecordRaw } from 'vue-router';
import authRouter from 'src/auth/router';
import isAuthenticatedGuard from 'src/auth/router/auth-guard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    ...authRouter,
  },
  {
    path: '/documents',
    name: 'home',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'documents',
        component: () => import('src/documents/pages/DocumentsPage.vue'),
      },
      {
        path: ':id',
        name: 'document',
        component: () => import('src/documents/pages/DocumentPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
