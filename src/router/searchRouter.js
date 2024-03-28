import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Main = lazy(()=>import("../pages/search/MainPage"))
const Webtoon = lazy(()=>import("../pages/search/WebtoonPage"))
//TODO :  Palette 추가

const searchRouter = () => {
    return [
        {
            path: '',
            element: <Suspense><Main /></Suspense>
        },
        {
            path: 'webtoon',
            element: <Suspense><Webtoon /></Suspense>
        }
    ]
}

export default searchRouter;