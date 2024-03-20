import axios from "axios"
import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/webtoon`

export const getList = async (pageParam) => {
    let {page, size, updateDay, tabValue, genre, fin, platform, value, id} = pageParam;

    if(tabValue){
        page = "1";
    }

    const res = await axios.get(`${prefix}/list`,{params:{page, size, genre, updateDay, fin, platform, value, id}})
    return res.data  
}

export const get = async (id) => {
    const res = await axios.get(`${prefix}/${id}`)
    return res.data
}
