import axios from "axios";

export const getIP = async () => {

    let api =await axios.get(`https://api.ipify.org`);
    console.log(api.data)
    localStorage.setItem("IP", api.data);
}

	