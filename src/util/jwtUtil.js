import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/webtoonApi";

const jwtAxios = axios.create()

const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = {headers:{'Authorization':`Bearer ${accessToken}`}}
    
    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)
   
    //새로 만들어진 액세스토큰과 리프레시 토큰 리턴
    return res.data
}
//before request
const beforeReq = (config) => {

    console.log("before request.............")

    const memberInfo = getCookie('member')

    if( !memberInfo ) {
        console.log("Member NOT FOUND")
        return Promise.reject(
            {response:
                    {data:
                        {error:"REQUIRE_LOGIN"}
                    }
            }
        )
    }    

    const {accessToken} = memberInfo
    // console.log("---------------"+accessToken)
    // Authorization 헤더 처리
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}
   

//fail request
const requestFail = (err) => {
    console.log("request error .....")
    return Promise.reject(err)
}

//before return response
const beforeRes = async (res) => {
    console.log("before return response.....")
    console.log(res)
    const data = res.data
    if(data && data.error === 'ERROR_ACCESS_TOKEN'){
        const memberCookieValue = getCookie("member")
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)
        console.log("refreshJWT RESULT", result)
        //저장
        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken
        setCookie("member", JSON.stringify(memberCookieValue),1)

        //화면에서 에러가 뜨기때문에 원래의 호출
        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await axios(originalRequest)
    }
    return res
}

const responseFail = (err) => {
    console.log("response fail error .....")
    return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios;