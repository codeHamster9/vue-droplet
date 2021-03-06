/* eslint-disable consistent-return */
import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';
import SmileyCheck from '@/views/SmileyCheck.vue';
import Home from '@/views/Home.vue';
import PageNotFound from '@/views/404.vue';
import Gifts from '@/views/Gifts.vue';
import Kids from '@/views/Kids.vue';
import store from '@/store';
import firebase from '@/firebase';
import { routeNames } from '@/router/route-names';
import { isDebug } from '@/utils/helpers';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/404',
      name: routeNames.PAGE_NOT_FOUND,
      component: PageNotFound,
    },
    {
      path: '/login',
      name: routeNames.LOGIN,
      component: Login,
    },
    {
      path: '/sign-up',
      name: routeNames.SIGNUP,
      component: SignUp,
    },
    {
      path: '/',
      name: routeNames.HOME,
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/smiley',
      name: routeNames.SMILES,
      component: SmileyCheck,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/gifts',
      name: routeNames.GIFTS,
      component: Gifts,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/kids',
      name: routeNames.KIDS,
      component: Kids,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (isDebug) {
    console.log(` checkAuth::Hook - to:${to.name} from:${from.name || from.path}`);
  }
  const { currentUser } = firebase.auth();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next({ name: routeNames.LOGIN });

  else next();
});

router.beforeEach((to, from, next) => {
  if ([routeNames.HOME, routeNames.LOGIN, routeNames.SIGNUP].includes(to.name)) {
    if (isDebug) console.log('checkActiveKid::Hook - skip');
    return next();
  }

  if (isDebug) console.log(` checkActiveKid::Hook - to:${to.name} from:${from.name || from.path}`);

  const { activeKid } = store.state.kids;
  if (!activeKid) {
    next({ name: routeNames.HOME });
  } else next();
});

export default router;
