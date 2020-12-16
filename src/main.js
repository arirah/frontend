import Vue from 'vue';
import App from './App.vue';
import router from "./routes";

Vue.config.productionTip = false;
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import {sync} from 'vuex-router-sync';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/style.css';

sync(store, router);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
