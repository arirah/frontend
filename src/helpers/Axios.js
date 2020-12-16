import axios from "axios";
class Axios {
    header(headers = '') {
        if (!localStorage.getItem('_userToken')) {
            localStorage.setItem('_userToken', '')
        }
        return axios.create({
            timeout: 10000,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('_userToken'),
                ...headers
            },
        })
    }
}
export default new Axios();
