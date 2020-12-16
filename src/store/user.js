import Axios from "../helpers/Axios";
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        userInfo: '',
        uid: '',
    },

    actions: {
        getUserInfo({commit}) {
            Axios.header().get('/api/user').then((res) => {
                commit('setUserInfo', res.data)

                if (res.data.status === 'Token is Invalid') {
                    //window.location = '/login'
                    router.push({path: 'login'})
                }
                if (res.data.status === 'Authorization Token not found') {
                    // window.location = '/login'
                    router.push({path: 'login'})
                }
                if (res.data.status === 'Token is Expired') {
                    //window.location = '/login'
                    router.push({path: 'login'})
                }

            }).catch(() => {
                commit('setUserInfo', []);
                localStorage.removeItem('_userToken');
                localStorage.removeItem('vuex');
                localStorage.clear();
                this.$router.push({name: 'Login'})
            })
        },
        logout({commit}) {
            localStorage.removeItem('_userToken');
            localStorage.removeItem('vuex');
            localStorage.clear();
            commit('setLogout', false)
            window.location = '/login'
        },

    },
    mutations: {
        setUserInfo(state, userData) {
            state.userInfo = userData;
        },

        setLogout(state, data) {
            state.authenticated = data
        }
    }
}
