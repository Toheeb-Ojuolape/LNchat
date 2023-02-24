import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Auth/Login.vue'
import Signup from "../views/Auth/Signup.vue"
import Dashboard from "../views/DashboardPage.vue"
import Chat from "../views/ChatPage.vue"
import SingleChat from "../views/SingleChat.vue"
import TransactionsPage from "../views/TransactionsPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },

  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  {
    path: '/chat/:id',
    name: 'single-chat',
    component: SingleChat
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
