import {lazy, Suspense} from "react";
import { Navigate } from "react-router-dom";

const Main = lazy(()=>import("../pages/webtoon/MainPage"))
const Today = lazy(()=>import("../pages/webtoon/TodayPage"))
const Genre = lazy(()=>import("../pages/webtoon/GenrePage"))
const Platform = lazy(()=>import("../pages/webtoon/PlatformPage"))
const Rank = lazy(()=>import("../pages/webtoon/RankPage"))
const Detail = lazy(()=>import("../pages/webtoon/DetailPage"))

const webtoonRouter = () => {
    return [
        {
            path: '',
            element: <Navigate replace to={''}/>
        },
        {
            path: '',
            element: <Suspense><Main /></Suspense>
        },
        {
            path: 'today',
            element: <Suspense><Today /></Suspense>
        },
        {
            path: 'genre',
            element: <Suspense><Genre /></Suspense>
        },
        {
            path: 'platform',
            element: <Suspense><Platform /></Suspense>
        },
        {
            path: 'rank',
            element: <Suspense><Rank /></Suspense>
        },
        {
            path: 'webtoon/:id',
            element: <Suspense><Detail /></Suspense>
        },
    ]
}

export default webtoonRouter;

