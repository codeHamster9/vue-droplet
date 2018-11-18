import Vue from 'vue';
import firebase from 'firebase';
import Router from 'vue-router';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import Home from './views/Home.vue';

Vue.use(Router);
const router = new Router({
  routes: [{
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
  {
    path: '*',
    redirect: '/login',
  }, {
    path: '/',
    redirect: '/login',
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
  }, {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/hello',
    name: 'Hello',
    component: HelloWorld,
    meta: {
      requiresAuth: true,
    },
  },
  ],
});


router.beforeEach((to, from, next) => {
  const {
    currentUser,
  } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('hello');
  else next();
});

export default router;
