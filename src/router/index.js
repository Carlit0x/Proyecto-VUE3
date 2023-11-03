import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Areaview from '../views/Area.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "area" */ '../views/Area.vue')
  },
  {
    path: '/area/:id',
    name: 'areaUpdate',
    component: () => import(/* webpackChunkName: "areaUpdate" */ '../views/AreaUpdate.vue')
  },
  {
    path: '/activo',
    name: 'activos',
    meta: {
      requireAuth: false,
      verificarRol: true,
      rol: 'admin',
      precondicion:"area"
      },
    component: () => import(/* webpackChunkName: "activo" */ '../views/Activo.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "ActivoUpdate" */ '../views/Activo.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some((record) => record.meta.requireAuth)){
    if(null === localStorage.getItem('auth') || 'false' == localStorage.getItem('auth')){
      next({name: "home"});
    }
  }
  next();
});

export default router
