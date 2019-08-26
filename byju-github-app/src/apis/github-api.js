import axios from 'axios';

/**
 * Configure axios with baseURL and headers
 */
export default axios.create({
    baseURL: 'https://api.github.com/users/',
    headers:{
        Accept: 'application/vnd.github.v3+json'
    }
});