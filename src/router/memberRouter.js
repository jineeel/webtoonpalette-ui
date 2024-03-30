import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
const Login = lazy(()=> import("../pages/member/LoginPage"))
const Kakao = lazy(()=> import("../pages/member/RedirectPage"))
const Modify = lazy(() => import("../pages/member/ModifyPage"))
const Mypage = lazy(() => import("../pages/member/MyPage"))
const Favorite = lazy(() => import("../pages/member/FavoritePage"))
const memberRouter = () => {
    return [
        {
            path: 'login',
            element: <Suspense><Login/></Suspense>
        },
        {
            path: 'redirect',
            element: <Suspense><Kakao /></Suspense>
        },
        {
            path: 'modify',
            element: <Suspense><Modify /></Suspense>
        },
        {
            path: 'mypage',
            element: <Suspense><Mypage /></Suspense>
        },
        {
            path: 'favorite',
            element: <Suspense><Favorite /></Suspense>
        },
        // TODO - palette 추가
        // {
        //     path: 'palette',
        //     element: <Suspense> - </Suspense>
        // },
        
    ]

}

export default memberRouter;