import { Suspense, lazy } from "react";

const Login = lazy(()=> import("../pages/member/LoginPage"))
const Kakao = lazy(()=> import("../pages/member/RedirectPage"))
const Modify = lazy(() => import("../pages/member/ModifyPage"))

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
            element : <Suspense><Modify /></Suspense>
        }
        
    ]

}

export default memberRouter;