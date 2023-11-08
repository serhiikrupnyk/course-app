import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/compat/app";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/SignUp')
  },
  {
    path: '/',
    name: 'course',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/CoursePage.vue')
  },
  {
    path: '/statistic',
    name: 'statistic',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/StatisticsPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some(record => record.meta.auth)

  if (requiredAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
