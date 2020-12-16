import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router)

let routes = [
    {
        path: "/", component: lazyLoad('Home'),
    },
    {
        path: "/login", component: lazyLoad('Login')
    },
    {
        path: "/register", component: lazyLoad('Register')
    },
    {
        path: "/product/:id?", component: lazyLoad('ProductDetails')
    },
    {
        path: "/user", component: lazyLoad('Profile'), meta: {requiresAuth: true}
    }
];


const router = new Router({
    mode: 'history',
    routes: routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        let user = localStorage.getItem('_userToken');
        if (user === '') {
            router.push({name: 'Login'})
            return false;
        }
        console.log(store.state.user.userInfo.user)
        if (!store.state.user.userInfo.user) {
            //window.location.href = '/login'
            return false
        }
        next();
    } else {
        next() // make sure to always call next()!
    }
})

function lazyLoad(view) {
    return () => import(`./../components/${view}.vue`)
}


export default router;
