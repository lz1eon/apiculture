import axios from "axios";

const client = axios.create({
    baseUrl: process.env.REACT_APP_API_BASE, 
});

export default client;