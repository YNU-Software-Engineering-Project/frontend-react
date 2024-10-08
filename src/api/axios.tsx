import axios from "axios";

const api = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
    timeout : 300000, //5분
    headers : {
        "Content-Type" : "application/json",
    }
});

export default api;