import axios from "axios";
import baseURL from '../api/auth.api';

export const getData = async (setData) => {
    axios.defaults.baseURL = baseURL;
    await axios.get("071553e2-cecd-4ede-b795-083b0df91d5e", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).then((response) => {
        setData(response.data.data);
    }).catch((error) => {
        console.log("Error =>", error);
    });
}