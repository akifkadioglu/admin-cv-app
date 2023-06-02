import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Login from '../pages/Login/View.vue'
import Blog from '../pages/Blog/View.vue'
import Type from '../pages/Type/View.vue'
import AuthLayout from '../layouts/auth.vue'
import OtherLayout from '../layouts/other.vue'

import { routeName } from './routeName'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: routeName.HOME,
    meta: { layout: OtherLayout, requiresAuth: true },
    redirect: {
      name: routeName.BLOG
    },
    children: [
      {
        path: '/type',
        name: routeName.TYPE,
        component: Type,
      },
      {

        path: '/blog',
        name: routeName.BLOG,
        component: Blog,
      },
    ],
  },
  {
    path: '/login',
    name: routeName.LOGIN,
    meta: { layout: AuthLayout },
    component: Login

  },

  {
    path: "/:catchAll(.*)",
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.meta.requiresAuth;

  const waitForAuth = new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });
  const user = await waitForAuth;

  if (requiresAuth && !user) {
    next("/login")
  } else {
    next();
  }
});
