import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-496ea.firebaseio.com/'
});

export default instance;