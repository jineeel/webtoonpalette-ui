import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";

const initState = { username : '' }

const loadMemberCookie = () => {
    const memberInfo = getCookie('member')

    //닉네임 처리
    if(memberInfo && memberInfo.username) {
        console.log("memberInfo.username:"+memberInfo.username)
        memberInfo.username = decodeURIComponent(memberInfo.username)
    }
    return memberInfo
}


// export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param))

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login.....")
            console.log(action.payload)
            setCookie("member", JSON.stringify(action.payload),1)
            return action.payload
        },
        logout: (state, action) => {
            console.log("logout....")
            removeCookie('member')
        }
    },
   
})

export const {login,logout} = loginSlice.actions
export default loginSlice.reducer