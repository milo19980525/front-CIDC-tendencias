import { createRouter, createWebHistory } from 'vue-router'
import Revistas from '../views/Revistas.vue'
import Pago from '../views/Pago.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Revistas',
    component: Revistas,
    meta: {rutaProtegida: true}
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  },
  {
    path: '/pago',
    name: 'Pago',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pago.vue'),
    meta: {rutaProtegida: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.meta.rutaProtegida)
  if(to.meta.rutaProtegida){
    console.log(store.getters.usuarioAutenticado)
    if(store.getters.usuarioAutenticado){
      next()
    }
    else{
      next('/ingreso')
    }
  } else{
    next()
  }
})
export default router