import { createWebHistory, createRouter } from 'vue-router'

const Layout = () => import('@/pages/Main.vue')
const Home = () => import('@/pages/home/index.vue')
const Order = () => import('@/pages/order/index.vue')
const User = () => import('@/pages/user/index.vue')
const Login = () => import('@/pages/login/index.vue')
const createOrder = () => import('@/pages/createOrder/index.vue')
const detail = () => import('@/pages/detail/index.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        meta: {
          icon: 'home-o',
          name: '首页'
        },
        component: Home
      },
      {
        path: 'order',
        meta: {
          icon: 'orders-o',
          name: '订单'
        },
        component: Order
      },
      {
        path: 'user',
        meta: {
          icon: 'user-circle-o',
          name: '我的'
        },
        component: User
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/createOrder',
    name: 'createOrder',
    component: createOrder
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
