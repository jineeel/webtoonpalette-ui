import axios from "axios";
import { API_SERVER_HOST } from "./webtoonApi";

const rest_api_key = process.env.REACT_APP_NAVER_KEY

const redirect_uri = 'http://localhost:3000/member/naver'

const auth_code_path ='https://nid.naver.com/oauth2.0/authorize'

const access_token_url = 'https://nid.naver.com/oauth2.0/token'

const rest_api_client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET

const state = Math.random()


export const getNaverLoginLink = () => {
    const naverURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&state=${state}&response_type=code`;

    return naverURL
}

export const getAccessToken = async (authCode) => {
    const header = {headers: {"Content-type":"application/x-www-form-urlencoded;charset=utf-8"}}

    const params = {
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        client_secret : rest_api_client_secret,
        code: authCode,
        state: state
    }
 
    const res = await axios.post(access_token_url, params, header)

    const accessToken = res.data.access_token

    return accessToken
}

export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/naver?accessToken=${accessToken}`)
    return res.data
}