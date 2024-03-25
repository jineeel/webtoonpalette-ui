import axios from "axios";
import { API_SERVER_HOST } from "./webtoonApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/member`

export const getMember = async (id) => {
    const res = await axios.get(`${host}/${id}`)
    return res.data
}

export const putMember = async (providerId, member) => {
    const header =  {headers: {"Content-Type":"multipart/form-data"}}
    const res = await jwtAxios.put(`${host}/${providerId}`, member, header)

    return res.data
}