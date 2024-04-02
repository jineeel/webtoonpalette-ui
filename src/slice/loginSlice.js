import { createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";


const initState = { 
    id: '',
    nickname: '',
    uploadFileName: '',
    providerId : '' 
}

const loadMemberCookie = () => {
    const memberInfo = getCookie('member')

    if(memberInfo && memberInfo.providerId) {

        memberInfo.id = decodeURIComponent(memberInfo.id)
        memberInfo.providerId = decodeURIComponent(memberInfo.providerId)
        
    }
    return memberInfo
}


const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login.....")  

            setCookie("member", JSON.stringify(action.payload),1)
        
            return action.payload
        },
        logout: (state, action) => {
            console.log("logout....")
            removeCookie('member')

            return {...initState}
        }
    },
   
})



export const {login,logout} = loginSlice.actions
export default loginSlice.reducer