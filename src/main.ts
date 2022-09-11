import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueDebounce from 'vue-debounce'

// import mitt from "mitt";
// const emitter = mitt();
// const app = createApp(App);
// app.config.globalProperties.emitter = emitter;
export const EventBus = new Vue();

//STYLES
import "./styles/styles.scss"

Vue.use(ElementUI);
Vue.use(vueDebounce)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
