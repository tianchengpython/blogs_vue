import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import write from '../views/write.vue'
import book from '../views/book.vue'
import read_book from '../views/read_book.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/blogs',
    name: 'home',
    component: home
  },
  {
    path: '/write',
    name: 'write',
    component: write
  },
  {
    path: '/book',
    name: 'book',
    component: book
  },
  {
    path: '/read_book',
    name: 'read_book',
    component: read_book
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
