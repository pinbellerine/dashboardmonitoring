import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/Register';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    path: '/login',
    component: lazy(() => import('./pages/Login')),
  },
  {
    path: '/Dashboard',
    component: lazy(() => import('./pages/Dashboard')),
  },
  {
    path: '/Grid',
    component: lazy(() => import('./pages/DataGrid')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
