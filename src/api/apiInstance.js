import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://todo-c7cc1-default-rtdb.firebaseio.com",
});

export default apiInstance;
