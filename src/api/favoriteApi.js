import axios from "axios"
import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./webtoonApi";

const prefix = `${API_SERVER_HOST}/api/favorite`

export const postFavorite = async (param) => {
    let {memberId, webtoonId} = param

    const res = await jwtAxios.post(`${prefix}/`, {memberId : memberId, webtoonId : webtoonId})
    return res.data
}

export const getFavorite = async (param) => {
    let {memberId, webtoonId} = param

    const res = await jwtAxios.get(`${prefix}/`, {params:{memberId : memberId, webtoonId : webtoonId}})
    return res.data
}

export const deleteFavorite = async (id) => {
    const res = await jwtAxios.delete(`${prefix}/${id}`)
    return res.data
}

export const getFavoriteWebtoon = async ({memberId, page, size, genre}) => {
    const res = await jwtAxios.get(`${prefix}/${memberId}`,{params:{page:page, size:size, genre: genre}})
    return res.data
}

