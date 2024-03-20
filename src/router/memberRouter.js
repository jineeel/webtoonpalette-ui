import { Suspense, lazy } from "react";

const Login = lazy(()=> import("../pages/member/LoginPage"))
const Kakao = lazy(()=> import("../pages/member/KakaoRedirectPage"))
const Naver = lazy(()=> import("../pages/member/NaverRedirectPage"))

const memberRouter = () => {
    return [
        {
            path: 'login',
            element: <Suspense><Login/></Suspense>
        },
        // {
        //     path: "logout",
        //     element: <Suspense><Logout /></Suspense>
        // },
        {
            path: 'kakao',
            element: <Suspense><Kakao /></Suspense>
        },
        {
            path: 'naver',
            element: <Suspense><Naver /></Suspense>
        },
    ]

}

export default memberRouter;