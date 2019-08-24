import Vue from 'vue';
import firebase from 'firebase';
import Router from 'vue-router';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';
import SmileyCheck from '@/views/SmileyCheck.vue';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import PageNotFound from '@/views/404.vue';
import Gifts from '@/views/Gifts.vue';
import Kids from '@/views/Kids.vue';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: PageNotFound,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/smiley',
      name: 'SmileyCheck',
      component: SmileyCheck,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/gifts',
      name: 'Gifts',
      component: Gifts,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/kids',
      name: 'Kids',
      component: Kids,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
