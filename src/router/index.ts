import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
import weatherPage from '../components/weather-page.cmp.vue';
import favoritesPage from '../components/favorites-page.cmp.vue';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'weatherPage',
    component: weatherPage
  },
  {
    path: '/favorites',
    name: 'favoritesPage',
    component: favoritesPage
  }
]


const router = new VueRouter({
  routes
})

export default router
